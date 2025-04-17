const createConnection = require('../../config/dbconnect.js');

async function getDashboardData() {
    const connection = await createConnection();
    try {
        let responeData = {};

        const [sachTrongThang] = await connection.execute('SELECT COUNT(*) FROM Sach WHERE MONTH (NgayNhapSach) = MONTH(CURRENT_DATE) AND YEAR(NgayNhapSach) = YEAR(CURRENT_DATE);');
        const [sachTrongThangTruoc] = await connection.execute('SELECT COUNT(*) FROM Sach WHERE MONTH(NgayNhapSach) = CASE WHEN MONTH(CURRENT_DATE) = 1 THEN 12 ELSE MONTH(CURRENT_DATE) - 1 END AND YEAR(NgayNhapSach) = CASE WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1 ELSE YEAR(CURRENT_DATE) END;')
        responeData.sachTrongThang = sachTrongThang[0]['COUNT(*)']
        responeData.sachTrongThangTruoc = sachTrongThangTruoc[0]['COUNT(*)']

        const [nhanVienTrongThang] = await connection.execute('SELECT COUNT(*) FROM NhanVienThuVien;');
        const [nhanVienTrongThangTruoc] = await connection.execute('SELECT COUNT(*) FROM NhanVienThuVien WHERE MONTH(NgayBatDauLamViec) <= CASE WHEN MONTH(CURRENT_DATE) = 1 THEN 12 ELSE MONTH(CURRENT_DATE) - 1 END AND YEAR(NgayBatDauLamViec) <= CASE WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1 ELSE YEAR(CURRENT_DATE) END; ')
        responeData.nhanVienTrongThang = nhanVienTrongThang[0]['COUNT(*)']
        responeData.nhanVienTrongThangTruoc = nhanVienTrongThangTruoc[0]['COUNT(*)']

        const [docgiaTrongThang] = await connection.execute('SELECT COUNT(*) FROM DocGia;');
        const [docgiaTrongThangTruoc] = await connection.execute('SELECT COUNT(*) FROM DocGia WHERE MONTH(NgayDangKy) <= CASE WHEN MONTH(CURRENT_DATE) = 1 THEN 12 ELSE MONTH(CURRENT_DATE) - 1 END AND YEAR(NgayDangKy) <= CASE WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1 ELSE YEAR(CURRENT_DATE) END;')
        responeData.docgiaTrongThang = docgiaTrongThang[0]['COUNT(*)']
        responeData.docgiaTrongThangTruoc = docgiaTrongThangTruoc[0]['COUNT(*)']

        const [tienPhatDaThuTrongThang] = await connection.execute('SELECT SUM(SoTienThu) FROM PhieuPhat WHERE MONTH(NgayLapPhieu) = MONTH(CURRENT_DATE) AND YEAR(NgayLapPhieu) = YEAR(CURRENT_DATE);')
        const [tienPhatDaThuThangTruoc] = await connection.execute("SELECT SUM(SoTienThu) FROM PhieuPhat WHERE MONTH(NgayLapPhieu) = CASE WHEN MONTH(CURRENT_DATE) = 1 THEN 12 ELSE MONTH(CURRENT_DATE) - 1 END AND YEAR(NgayLapPhieu) = CASE WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1 ELSE YEAR(CURRENT_DATE) END AND TrangThai = 'Đã thanh toán';")
        responeData.tienPhatDaThuTrongThang = tienPhatDaThuTrongThang[0]['SUM(SoTienThu)']
        responeData.tienPhatDaThuThangTruoc = tienPhatDaThuThangTruoc[0]['SUM(SoTienThu)']

        const [topDocGia] = await connection.execute("SELECT dg.MaDocGia, dg.HoTen, dg.DiaChi, COUNT(ctms.MaSach) AS SoLuongSachMuon FROM PhieuMuon pm JOIN ChiTietPhieuMuonSach ctms ON pm.MaPhieuMuon = ctms.MaPhieuMuon JOIN DocGia dg ON pm.MaDocGia = dg.MaDocGia WHERE MONTH(pm.NgayTao) = MONTH(CURRENT_DATE) AND YEAR(pm.NgayTao) = YEAR(CURRENT_DATE) GROUP BY pm.MaDocGia ORDER BY COUNT(ctms.MaSach) DESC LIMIT 10;")
        const [sachHot] = await connection.execute('SELECT s.TenSach, tg.TenTacGia, nxb.TenNhaXuatBan, SUM(ctms.SoLuong) AS SoLuongDuocMuon FROM PhieuMuon pm JOIN ChiTietPhieuMuonSach ctms ON pm.MaPhieuMuon = ctms.MaPhieuMuon JOIN Sach s ON ctms.MaSach = s.MaSach JOIN TacGia tg ON s.MaTacGia = tg.MaTacGia JOIN NhaXuatBan nxb ON s.NhaXuatBan = nxb.MaNhaXuatBan WHERE MONTH(pm.NgayTao) = MONTH(CURRENT_DATE) AND YEAR(pm.NgayTao) = YEAR(CURRENT_DATE) GROUP BY ctms.MaSach ORDER BY SUM(ctms.SoLuong) DESC LIMIT 10;')
        responeData.topDocGia = topDocGia
        responeData.sachHot = sachHot

        const [chartData] = await connection.execute("WITH ThangGanNhat AS (SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS Thang FROM (SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) AS nums) SELECT t.Thang, COALESCE(COUNT(p.MaPhieuMuon), 0) AS SoLuongPhieuMuon, COALESCE(SUM(p.SoSachMuon), 0) AS TongSachMuon FROM ThangGanNhat t LEFT JOIN PhieuMuon p ON DATE_FORMAT(p.NgayTao, '%Y-%m') = t.Thang GROUP BY t.Thang ORDER BY t.Thang");
        const result = chartData.map(item => ({
            "name": item.Thang.split('-').reverse().join('-'), 
            "total": Number(item.TongSachMuon) 
          }));
        responeData.chartData = result;

        return (responeData);

    } catch (err) {
        return err;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getDashboardData;