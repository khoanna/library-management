const createConnection = require('../../config/dbconnect.js');

async function traSach(maPhieuMuon, maDocGia, maTK, ngayTra, ghiChu) {
    const connection = await createConnection();

    try {
        const [rows] = await connection.execute(
            `SELECT IFNULL(MAX(CAST(SUBSTRING(MaPhieuTra, 3) AS UNSIGNED)), 0) AS currentMax 
       FROM PhieuTra`
        );
        const currentMax = Number(rows[0].currentMax);
        const nextNumber = currentMax + 1;
        const newMaPhieuTra = `PT${nextNumber.toString().padStart(3, '0')}`;

        const finalNgayTra = ngayTra ? ngayTra : new Date().toISOString().split('T')[0];

        console.log(maTK);
        const [res] = await connection.execute(`SELECT NhanVienThuVien.MaNhanVien FROM NhanVienThuVien JOIN TaiKhoan ON NhanVienThuVien.Matk = TaiKhoan.Matk WHERE TaiKhoan.Matk = '${maTK}';`)
        console.log(res);
        
        const maNhanVien = res[0]["MaNhanVien"];

        const [result] = await connection.execute(
            `INSERT INTO PhieuTra (MaPhieuTra, MaPhieuMuon, MaDocGia, NguoiTiepNhan, NgayTra, GhiChu)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [newMaPhieuTra, maPhieuMuon, maDocGia, maNhanVien, finalNgayTra, ghiChu || ""]
        );

        console.log("Trả thành công");

        return { success: true, message: "Phiếu trả đã được tạo thành công.", MaPhieuTra: newMaPhieuTra };
    } catch (error) {
        console.error("Error creating PhieuTra:", error);
        return { success: false, message: error.message };
    } finally {
        await connection.end();
    }
}

module.exports = traSach;
