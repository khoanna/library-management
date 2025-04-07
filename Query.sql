--Lấy tuổi quy định
  -- @blockLấy tuổi tối thiểu
  SELECT GiaTri
  FROM QuyDinh
  where TenQuyDinh='TuoiToiThieu';
  -- @blockLấy tuổi tối đa
  SELECT GiaTri
  FROM QuyDinh
  where TenQuyDinh='TuoiToiDa';
--sửa tuổi quy định
  -- @blockSửa tuổi tối thiểu
  CALL CapNhatQuyDinhTuoi('TuoiToiThieu', "nhập tuổi tối thiểu vào đây");
  -- @blockSửa tuổi tối đa
  CALL CapNhatQuyDinhTuoi('TuoiToiDa',"nhập tuổi tối đa vào đây");
-- @blockLấy số sách mượn tối đa trong một lần 
SELECT GiaTri
FROM QuyDinh
WHERE TenQuyDinh = 'SoLuongMuonToiDa';
-- @blockSửa số sách mượn tối đa trong một lần 
CALL CapNhatSoLuongMuonToiDa(50);
-- @block Lấy số ngày mượn tối đa
SELECT GiaTri
FROM QuyDinh
WHERE TenQuyDinh = 'SoNgayMuonToiDa';
-- @block Sửa số ngày mượn tối đa
CALL CapNhatSoNgayHenTraToiDa("Số ngày mượn tối đa mới");
-- @block Lấy mức tiền phạt
SELECT GiaTri
FROM QuyDinh
WHERE TenQuyDinh = 'MucPhat';
-- @block Sửa mức tiền phạt
UPDATE QuyDinh
SET GiaTri = "Nhập mức tiền phạt mới vào đây"
WHERE TenQuyDinh = 'MucPhat';


-- @block lấy số lượng độc giả đã mượn sách trong 12 tháng trước kể từ tháng hiện tại
WITH ThangGanNhat AS (
    SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS Thang
    FROM (
        SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 
        UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 
        UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
        UNION ALL SELECT 12
    ) AS nums
)
SELECT 
    t.Thang,
    COALESCE(COUNT(p.MaPhieuMuon), 0) AS SoLuongPhieuMuon,
    COALESCE(SUM(p.SoSachMuon), 0) AS TongSachMuon
FROM ThangGanNhat t
LEFT JOIN PhieuMuon p ON DATE_FORMAT(p.NgayTao, '%Y-%m') = t.Thang
GROUP BY t.Thang
ORDER BY t.Thang;
SELECT 
    m.ThangNam,
    COALESCE(t.SoLuongDocGia, 0) AS SoLuongDocGia
FROM Months m
LEFT JOIN (
    SELECT 
        DATE_FORMAT(NgayTao, '%Y-%m') AS ThangMuon,
        COUNT(DISTINCT MaDocGia) AS SoLuongDocGia
    FROM PhieuMuon
    WHERE YEAR(NgayTao) = YEAR(CURDATE())
    GROUP BY ThangMuon
) t ON m.ThangNam = t.ThangMuon
ORDER BY m.ThangNam;
-- @block Lấy 10 độc giả mượn sách gần đây kèm số sách đã mượn
SELECT 
    dg.MaDocGia,
    dg.HoTen,
    MAX(pm.NgayTao) AS NgayMuonGanNhat,
    SUM(ct.SoLuong) AS TongSoSachDaMuon
FROM 
    DocGia dg
JOIN 
    PhieuMuon pm ON dg.MaDocGia = pm.MaDocGia
JOIN 
    ChiTietPhieuMuonSach ct ON pm.MaPhieuMuon = ct.MaPhieuMuon
GROUP BY 
    dg.MaDocGia, 
    dg.HoTen
ORDER BY 
    NgayMuonGanNhat DESC
LIMIT 10;
-- @block Lấy toàn bộ thông tin độc giả
SELECT * FROM DocGia;
-- @block Lấy tất cả phiếu mượn và thông tin của chúng
SELECT * FROM PhieuMuon;
-- @block Xem chi tiết phiếu mượn (sách gì,bao nhiêu cuốn) 
SELECT * 
FROM chitietphieumuonsach 
WHERE  MaPhieuMuon="Nhập mã phiếu mượn cần xem chi tiết vào đây"
-- @block Thêm phiếu mượn ( chỉ cần nhập 3 trường)
-- Ngày tạo phiếu tự động lấy chính xác hiện tại khi nhập
-- Tự động tạo ngày hẹn trả theo trigger với ngày mượn tối đa đã quy định
INSERT INTO PhieuMuon (MaPhieuMuon, MaDocGia, NguoiTao)
VALUES ("Mã phiếu mượn","Mã đọc giả", "Mã người tạo");
-- @block Thêm phiếu trả
--Tổng tiền phạt của phiếu trả sẽ tự động cập nhật theo trigger khi thêm, sửa, xóa các chitietphieutra
INSERT INTO PhieuTra (MaPhieuTra, MaPhieuMuon, MaDocGia, NguoiTiepNhan, NgayTra,GhiChu)
VALUES
    ("Mã phiếu trả",
    "Mã phiếu mượn",
    "Mã đọc giả",
    "Ma nhân viên tiếp nhận",
    "Có thể nhập ngày trả hoặc không nhập thì mặc định là ngày hiện tại khi nhập",
    "có thể thêm ghi chú hoặc không");
---- @block Thêm thể loại mới
INSERT INTO TheLoaiSach (MaTheLoai, TenTheLoai, MoTa)
VALUES 
    ("Mã thể loại", "Tên Thể Loại", "Mô tả có hoặc không");
-- @block Xóa thể loại (chỉ thực hiện nếu không có sách nào thuộc thể loại này)
DELETE FROM TheLoaiSach
WHERE MaTheLoai = "Mã thể loại muốn xóa";
-- @block Đếm số lượng thể loại sách
SELECT COUNT(*) AS SoLuongTheLoai
FROM TheLoaiSach;
-- @block Danh sách thể loại và số sách tương ứng
SELECT 
    tls.MaTheLoai,
    tls.TenTheLoai,
    COUNT(s.MaSach) AS SoLuongSach
FROM 
    TheLoaiSach tls
LEFT JOIN 
    Sach s ON tls.MaTheLoai = s.MaTheLoai
GROUP BY 
    tls.MaTheLoai, 
    tls.TenTheLoai
ORDER BY 
    SoLuongSach DESC;
-- @block Lấy tất cả thông tin sách
SELECT *
FROM Sach;
-- @block Thêm sách mới (đảm bảo MaTheLoai, MaTacGia, NhaXuatBan đã tồn tại)
INSERT INTO Sach (
    MaSach, 
    TenSach, 
    MaTheLoai, 
    MaTacGia, 
    NamXuatBan, 
    NhaXuatBan, 
    GiaSach, 
    SoLuong
)
VALUES (
    'S001', 
    'Lập trình C++', 
    'TL001',       -- Thay bằng MaTheLoai hợp lệ
    'TG001',       -- Thay bằng MaTacGia hợp lệ
    '2023-01-01', 
    'NXB001',      -- Thay bằng MaNhaXuatBan hợp lệ
    250000, 
    10
);
-- @block Xóa sách (chỉ xóa được nếu không có phiếu mượn/trả liên quan)
DELETE FROM Sach 
WHERE MaSach = "Mã sách muốn xóa";

-- @block Lấy năm xuất bản hợp lệ
SELECT GiaTri
FROM QuyDinh
WHERE TenQuyDinh = 'NamXuatBanHopLe';
-- @block Sửa năm xuất bản hợp lệ
UPDATE QuyDinh
SET GiaTri = "Giá trị năm xuất bản mới"
WHERE TenQuyDinh = 'NamXuatBanHopLe';

-- Lấy số lượng sách mới trong tháng qua
SELECT COUNT(*) FROM Sach
WHERE MONTH (NgayNhapSach) = MONTH(CURRENT_DATE)
      AND YEAR(NgayNhapSach) = YEAR(CURRENT_DATE);
-- Lấy số lượng sách mới trong tháng trước đó
SELECT COUNT(*) FROM Sach
WHERE MONTH(NgayNhapSach) = CASE
                                WHEN MONTH(CURRENT_DATE) = 1 THEN 12
                                ELSE MONTH(CURRENT_DATE) - 1
                            END
      AND YEAR(NgayNhapSach) = CASE
                                WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1
                                ELSE YEAR(CURRENT_DATE)
                            END;
-- Lấy số nhân viên trong tháng 
SELECT COUNT(*) FROM NhanVienThuVien;
-- Lấy số nhân viên trong tháng trước đó
SELECT COUNT(*) FROM NhanVienThuVien
WHERE MONTH(NgayBatDauLamViec) <= CASE 
                                    WHEN MONTH(CURRENT_DATE) = 1 THEN 12
                                    ELSE MONTH(CURRENT_DATE) - 1
                                  END
      AND YEAR(NgayBatDauLamViec) <= CASE 
                                    WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1
                                    ELSE YEAR(CURRENT_DATE)
                                  END;
-- Lấy số độc giả tháng qua
SELECT COUNT(*) FROM DocGia;
-- Lấy số độc giả tháng trước đó
SELECT COUNT(*) FROM DocGia
WHERE MONTH(NgayLamThe) <= CASE 
                                WHEN MONTH(CURRENT_DATE) = 1 THEN 12
                                ELSE MONTH(CURRENT_DATE) - 1
                           END
      AND YEAR(NgayLamThe) <= CASE 
                                WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1
                                ELSE YEAR(CURRENT_DATE)
                              END;
-- Lấy số tiền phạt đã thu trong tháng qua
SELECT SUM(SoTienThu) FROM PhieuPhat
WHERE MONTH(NgayLapPhieu) = MONTH(CURRENT_DATE)
      AND YEAR(NgayLapPhieu) = YEAR(CURRENT_DATE);
-- Lấy số tiền phạt đã thu trong tháng trước đó
SELECT SUM(SoTienThu) FROM PhieuPhat
WHERE MONTH(NgayLapPhieu) = CASE 
                                WHEN MONTH(CURRENT_DATE) = 1 THEN 12
                                ELSE MONTH(CURRENT_DATE) - 1
                            END
      AND YEAR(NgayLapPhieu) = CASE 
                                WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1
                                ELSE YEAR(CURRENT_DATE)
                            END
      AND TrangThai = 'Đã thanh toán';
-- Lấy số lượng sách trong 12 tháng về trước kể từ tháng hiện tại
WITH ThangGanNhat AS (
    SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS Thang
    FROM (
        SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 
        UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 
        UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
        UNION ALL SELECT 12
    ) AS nums
)
SELECT 
    t.Thang,
    COALESCE(COUNT(p.MaPhieuMuon), 0) AS SoLuongPhieuMuon,
    COALESCE(SUM(p.SoSachMuon), 0) AS TongSachMuon
FROM ThangGanNhat t
LEFT JOIN PhieuMuon p ON DATE_FORMAT(p.NgayTao, '%Y-%m') = t.Thang
GROUP BY t.Thang
ORDER BY t.Thang;
-- Lấy 10 thông tin độc giả mượn nhiều sách nhất trong tháng qua
SELECT dg.HoTen, dg.DiaChi, COUNT(ctms.MaSach) AS SoLuongSachMuon
FROM PhieuMuon pm JOIN ChiTietPhieuMuonSach ctms ON pm.MaPhieuMuon = ctms.MaPhieuMuon
                  JOIN DocGia dg ON pm.MaDocGia = dg.MaDocGia
WHERE MONTH(pm.NgayTao) = MONTH(CURRENT_DATE)
        AND YEAR(pm.NgayTao) = YEAR(CURRENT_DATE)
GROUP BY pm.MaDocGia
ORDER BY COUNT(ctms.MaSach) DESC
LIMIT 10;
-- Lấy 10 thông tin sách được mượn nhiều nhất trong tháng qua
SELECT s.TenSach, tg.TenTacGia, nxb.TenNhaXuatBan, SUM(ctms.SoLuong) AS SoLuongDuocMuon
FROM PhieuMuon pm JOIN ChiTietPhieuMuonSach ctms ON pm.MaPhieuMuon = ctms.MaPhieuMuon
                  JOIN Sach s ON ctms.MaSach = s.MaSach
                  JOIN TacGia tg ON s.MaTacGia = tg.MaTacGia
                  JOIN NhaXuatBan nxb ON s.NhaXuatBan = nxb.MaNhaXuatBan
WHERE MONTH(pm.NgayTao) = MONTH(CURRENT_DATE) - 1
        AND YEAR(pm.NgayTao) = YEAR(CURRENT_DATE)
GROUP BY ctms.MaSach
ORDER BY SUM(ctms.SoLuong) DESC
LIMIT 10;   
-- Lấy tất cả các phiếu phạt và thông tin của chúng
SELECT * FROM PhieuPhat;   

-- Thêm phiếu phạt
        -- Người thu là mã nhân viên
        -- Tổng nợ là tổng số tiền hiện nợ 
        -- Số tiền thu là số tiền đã thu
INSERT INTO PhieuPhat (MaPhieuPhat, MaDocGia, TongNo, SoTienThu, TrangThai, NguoiThu)
VALUES (?, ?, ?, ?, ?, ?);

-- Nộp phạt
UPDATE PhieuPhat
SET TrangThai = 'Đã thanh toán'
WHERE MaPhieuPhat = '?';

-- Lấy tất cả tác giả và thông tin của họ
SELECT * FROM TacGia;
-- Thêm tác giả
INSERT INTO TacGia (MaTacGia, TenTacGia, TieuSu, QuocTich, NgaySinh, NgayMat)
VALUES (?);    
-- Lấy tất cả nhân viên và thông tin của họ
SELECT * FROM NhanVienThuVien;
-- Thêm nhân viên
INSERT INTO NhanVienThuVien (MaNhanVien, MaTK, HoTen, NgaySinh, DiaChi, Email, SoDienThoai, GioiTinh, NgayBatDauLamViec, ChucVu, Luong)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Thêm đọc giả 
INSERT INTO DocGia (
    MaDocGia,
    MaThe,
    HoTen,
    LoaiDocGia,
    NgaySinh,
    DiaChi,
    Email,
    SoDienThoai,
    GioiTinh,
    NgayLamThe,
    NgayHetHan
)
VALUES (
    'DG020', -- Mã đọc giả
    'DG20240001', -- Mã thẻ (độc nhất)
    'Nguyễn Văn A',
    'Thuong', -- Loại đọc giả (Thuong/VIP)
    '2000-01-01', -- Ngày sinh
    '123 Đường ABC, Quận 1, TP.HCM',
    'nguyenvanA1@example.com',
    '0901234567',
    'Nam',
    '2025-03-12', -- Ngày làm thẻ 
    '2025-06-12' -- Ngày hết hạn 
);


-- Thêm số tháng vào NgayHetHan của độc giả có mã thẻ 'DG20240001'
UPDATE DocGia
SET NgayHetHan = DATE_ADD(NgayHetHan, INTERVAL "Số tháng muốn thêm" MONTH)
WHERE MaDocGia = 'DG020'; -- mã đọc giả thêm tháng

-- Thêm phiếu trả
INSERT INTO PhieuTra (MaPhieuTra, MaPhieuMuon, NgayTra, MaDocGia, NguoiTiepNhan, GhiChu)
VALUES ( ?, ?, ?, ?, ?);

-- Phiếu phạt sẽ tự động thêm khi Phiếu trả nào là trả trễ và Tự động cập nhật số tiền phạt vào TongNo của độc giả luôn