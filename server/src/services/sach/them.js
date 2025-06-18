const createConnection = require('../../config/dbconnect.js');

async function them({ MaSach, SoLuong }) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT SoLuong 
       FROM Sach 
       WHERE MaSach = ?`,
      [MaSach]
    );

    if (rows.length === 0) {
      return { success: false, error: "MaSach không tồn tại" };
    }

    const currentSoLuong = Number(rows[0].SoLuong) || 0;
    const increment = Number(SoLuong);
    if (isNaN(increment) || increment <= 0) {
      return { success: false, error: "Số lượng truyền vào không hợp lệ" };
    }
    const newSoLuong = currentSoLuong + increment;

    const [result] = await connection.execute(
      `UPDATE Sach
       SET SoLuong = ?
       WHERE MaSach = ?`,
      [ newSoLuong, MaSach ]
    );

    if (result.affectedRows === 0) {
      return { success: false, error: "Cập nhật thất bại" };
    }

    return { success: true, error: "No" };
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng sách:", error);
    return { success: false, error: "Có lỗi xảy ra khi cập nhật" };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = them;
