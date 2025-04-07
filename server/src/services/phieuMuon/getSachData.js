const createConnection = require('../../config/dbconnect.js');

async function getSachData() {
    const connection = await createConnection();
    try {
        const respone = {};

        const [ds] = await connection.execute('SELECT * FROM Sach');
        const updatedSachList = await Promise.all(ds.map(async (sach) => {
            const [tacGia] = await connection.execute('SELECT TenTacGia FROM TacGia WHERE MaTacGia = ?', [sach.MaTacGia]);
            sach.TenTacGia = tacGia.length > 0 ? tacGia[0].TenTacGia : 'Chưa có tác giả';

            const [nhaXuatBan] = await connection.execute('SELECT TenNhaXuatBan FROM NhaXuatBan WHERE MaNhaXuatBan = ?', [sach.NhaXuatBan]);
            sach.TenNhaXuatBan = nhaXuatBan.length > 0 ? nhaXuatBan[0].TenNhaXuatBan : 'Chưa có nhà xuất bản';

            return sach;
        }))
        respone.danhSach = updatedSachList;

        const [dsTheLoai] = await connection.execute("SELECT tls.MaTheLoai, tls.TenTheLoai, COUNT(s.MaSach) AS SoLuongSach FROM TheLoaiSach tls LEFT JOIN Sach s ON tls.MaTheLoai = s.MaTheLoai GROUP BY tls.MaTheLoai, tls.TenTheLoai ORDER BY SoLuongSach DESC;")
        respone.danhSachTheLoai = dsTheLoai;

        const [namXuatBan] = await connection.execute("SELECT GiaTri FROM QuyDinh WHERE TenQuyDinh = 'NamXuatBanHopLe';")
        respone.namHopLe = namXuatBan[0]["GiaTri"];

        const [soTheLoai] = await connection.execute("SELECT COUNT(*) AS SoLuongTheLoai FROM TheLoaiSach;")
        respone.soTheLoai = soTheLoai[0]["SoLuongTheLoai"];

        return respone;
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getSachData;
