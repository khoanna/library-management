const createConnection = require('../../config/dbconnect.js');

async function xoaNhanVien(MaNhanVien) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      "SELECT MaTK FROM NhanVienThuVien WHERE MaNhanVien = ?",
      [MaNhanVien]
    );
    if (rows.length === 0) {
      throw new Error("Nhân viên không tồn tại");
    }
    const MaTK = rows[0].MaTK;

    await connection.execute(
      "DELETE FROM NhanVienThuVien WHERE MaNhanVien = ?",
      [MaNhanVien]
    );

    await connection.execute(
      "DELETE FROM TaiKhoan WHERE MaTK = ?",
      [MaTK]
    );

    await connection.commit();
    return { success: true, message: "Nhân viên và tài khoản đã được xóa thành công." };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

module.exports = xoaNhanVien;
