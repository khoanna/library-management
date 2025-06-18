const createConnection = require('../../config/dbconnect.js');

async function themPhieuPhat(MaDocGia, TongNo, SoTienThu, TrangThai, MaTK) {
    const connection = await createConnection();
    try {

        const [rows] = await connection.execute(`SELECT IFNULL(MAX(CAST(SUBSTRING(MaPhieuPhat, 3) AS UNSIGNED)), 0) AS currentMax FROM PhieuPhat `);

        const currentMax = rows[0].currentMax;

        const newMaPhieuPhat = `PP${(Number(currentMax) + 1).toString().padStart(3, '0')}`;

        const [res] = await connection.execute(`SELECT NhanVienThuVien.MaNhanVien FROM NhanVienThuVien JOIN TaiKhoan ON NhanVienThuVien.Matk = TaiKhoan.Matk WHERE TaiKhoan.Matk = '${MaTK}';`)
        const maNhanVien = res[0]["MaNhanVien"];

        try {
            const [result] = await connection.execute(
                `INSERT INTO PhieuPhat (MaPhieuPhat, MaDocGia, TongNo, SoTienThu, TrangThai, NguoiTaoPhieu) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [newMaPhieuPhat, MaDocGia, TongNo, SoTienThu, TrangThai, maNhanVien]
            );
            return (result);
        } catch (error) {
            return "err";
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = themPhieuPhat;
