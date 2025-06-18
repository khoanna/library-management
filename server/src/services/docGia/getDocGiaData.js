const createConnection = require('../../config/dbconnect.js');

async function getDocGiaData() {
    const connection = await createConnection();
    try {
        let responeData = {};

        const [thang] = await connection.execute("SELECT GiaTri FROM QuyDinh WHERE TenQuyDinh='ThoiHanTheDocGia';");
        responeData.thang = thang[0]["GiaTri"];

        const [tuoiQuyDinh] = await connection.execute(" SELECT GiaTri FROM QuyDinh where TenQuyDinh='TuoiToiThieu';");
        responeData.tuoiQuyDinh = tuoiQuyDinh[0]["GiaTri"];

        const [tuoiMax] = await connection.execute("  SELECT GiaTri FROM QuyDinh where TenQuyDinh='TuoiToiDa';")
        responeData.tuoiMax = tuoiMax[0]["GiaTri"];

        const [sachMuonToiDa] = await connection.execute("SELECT GiaTri FROM QuyDinh WHERE TenQuyDinh = 'SoLuongMuonToiDa';");
        responeData.soSachToiDa = sachMuonToiDa[0]["GiaTri"];

        const [ngayMuonToiDa] = await connection.execute("SELECT GiaTri FROM QuyDinh WHERE TenQuyDinh = 'SoNgayMuonToiDa';");
        responeData.soNgayToiDa = ngayMuonToiDa[0]["GiaTri"];

        const [tienPhat] = await connection.execute("SELECT GiaTri FROM QuyDinh WHERE TenQuyDinh = 'MucPhat';");
        responeData.tienPhat = tienPhat[0]["GiaTri"];

        const [docGiaGanDay] = await connection.execute("SELECT dg.MaDocGia, dg.HoTen, MAX(pm.NgayTao) AS NgayMuonGanNhat, SUM(ct.SoLuong) AS TongSoSachDaMuon FROM DocGia dg JOIN PhieuMuon pm ON dg.MaDocGia = pm.MaDocGia JOIN ChiTietPhieuMuonSach ct ON pm.MaPhieuMuon = ct.MaPhieuMuon GROUP BY dg.MaDocGia, dg.HoTen ORDER BY NgayMuonGanNhat DESC LIMIT 10;");
        responeData.docGiaGanDay = docGiaGanDay;

        const [danhSachDocGia] = await connection.execute("SELECT * FROM DocGia;")
        responeData.danhSachDocGia = danhSachDocGia;

        const [chartData] = await connection.execute("WITH RECURSIVE Last12Months AS (SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m') AS ThangNam UNION ALL SELECT DATE_FORMAT(DATE_SUB(STR_TO_DATE(CONCAT(ThangNam, '-01'), '%Y-%m-%d'), INTERVAL 1 MONTH), '%Y-%m') FROM Last12Months WHERE ThangNam > DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 12 MONTH), '%Y-%m')) SELECT L.ThangNam, COALESCE(T.SoLuongDocGia, 0) AS SoLuongDocGia FROM Last12Months L LEFT JOIN (SELECT DATE_FORMAT(NgayTao, '%Y-%m') AS ThangMuon, COUNT(DISTINCT MaDocGia) AS SoLuongDocGia FROM PhieuMuon WHERE NgayTao >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) GROUP BY ThangMuon) AS T ON L.ThangNam = T.ThangMuon ORDER BY L.ThangNam;")
        const result = chartData.map(item => ({
            "name": item.ThangNam.split('-').reverse().join('-'),
            "total": Number(item.SoLuongDocGia)
        }));
        responeData.chart = result;

        return responeData;
    } catch (err) {
        return err;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getDocGiaData;