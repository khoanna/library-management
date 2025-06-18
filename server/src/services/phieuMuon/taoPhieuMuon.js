const createConnection = require('../../config/dbconnect.js');

async function taoPhieuMuon(maDocGia, MaTK, dsSachMuon) {
  const connection = await createConnection();
  try {

    await connection.beginTransaction();

    const [rows] = await connection.execute(`
          SELECT IFNULL(MAX(CAST(SUBSTRING(MaPhieuMuon, 3) AS UNSIGNED)), 0) AS currentMax
          FROM PhieuMuon
        `);
    const currentMax = rows[0].currentMax;
    const newMaPhieuMuon = `PM${(Number(currentMax) + 1).toString().padStart(3, '0')}`;

    const [res] = await connection.execute(`SELECT NhanVienThuVien.MaNhanVien FROM NhanVienThuVien JOIN TaiKhoan ON NhanVienThuVien.Matk = TaiKhoan.Matk WHERE TaiKhoan.Matk = '${MaTK}';`)
    const nguoiTao = res[0]["MaNhanVien"];

    await connection.execute(`
          INSERT INTO PhieuMuon (MaPhieuMuon, MaDocGia, NguoiTao)
          VALUES (?, ?, ?)
        `, [newMaPhieuMuon, maDocGia, nguoiTao]);

    for (const item of dsSachMuon) {
      await connection.execute(`
              INSERT INTO ChiTietPhieuMuonSach (MaPhieuMuon, MaSach, SoLuong)
              VALUES (?, ?, ?)
            `, [
        newMaPhieuMuon,
        item.MaSach,
        item.SoLuong
      ]);
    }

    await connection.commit();

    console.log('Thêm phiếu mượn và chi tiết phiếu mượn thành công!');
    return { success: true, MaPhieuMuon: newMaPhieuMuon };
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return { success: false, error: error.message };
  } finally {
    if (connection) {
      connection.end();
    }
  }

}

module.exports = taoPhieuMuon;
