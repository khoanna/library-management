const createConnection = require('../../config/dbconnect.js');

async function addSach({
  TenSach,
  MaTheLoai,
  MaTacGia,
  NamXuatBan,
  NhaXuatBan,
  GiaSach,
  SoLuong
}) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(`
      SELECT IFNULL(MAX(CAST(SUBSTRING(MaSach, 2) AS UNSIGNED)), 0) AS maxMaSach
      FROM Sach
    `);

    const currentMax = rows[0].maxMaSach || 0;
    const nextNumber = Number(currentMax) + 1;
    const newMaSach = `S${nextNumber.toString().padStart(3, '0')}`; // e.g. S001, S002,...

    const [result] = await connection.execute(`
      INSERT INTO Sach (
          MaSach,
          TenSach,
          MaTheLoai,
          MaTacGia,
          NamXuatBan,
          NhaXuatBan,
          GiaSach,
          SoLuong
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      newMaSach,
      TenSach,
      MaTheLoai,
      MaTacGia,
      NamXuatBan,
      NhaXuatBan,
      GiaSach,
      SoLuong
    ]);

    console.log("Them sách thành công:", newMaSach);

    return result;
  } catch (error) {
    console.error("Lỗi khi chèn sách:", error);
    return { success: false, error: "Năm xuất bản không hợp lệ" };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

module.exports = addSach;
