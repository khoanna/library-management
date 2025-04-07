const createConnection = require('../../config/dbconnect.js');

async function themNhanVien(
  name,
  email,
  password,
  birthDate,
  address,
  gender,
  phone,
  role,
  salary
) {
  console.log(name, email, password, birthDate, address, gender, phone, role, salary);

  const connection = await createConnection();
  try {
    const [existing] = await connection.execute(
      "SELECT * FROM TaiKhoan WHERE Email = ?",
      [email]
    );
    if (existing.length > 0) {
      return { success: false, message: "Email đã được đăng ký." };
    }

    const [rowsTK] = await connection.execute(
      "SELECT IFNULL(MAX(CAST(SUBSTRING(MaTK, 3) AS UNSIGNED)), 0) AS maxMaTK FROM TaiKhoan"
    );
    const nextNumberTK = Number(rowsTK[0].maxMaTK) + 1;
    const newMaTK = `TK${nextNumberTK.toString().padStart(3, "0")}`;

    const accountRole = role === "Quản lý" ? "Admin" : "Staff";

    await connection.execute(
      "INSERT INTO TaiKhoan (MaTK, TenTK, Email, MatKhau, VaiTro) VALUES (?, ?, ?, ?, ?)",
      [newMaTK, newMaTK, email, password, accountRole]
    );

    const [rowsNV] = await connection.execute(
      "SELECT IFNULL(MAX(CAST(SUBSTRING(MaNhanVien, 3) AS UNSIGNED)), 0) AS maxMaNhanVien FROM NhanVienThuVien"
    );
    const nextNumberNV = Number(rowsNV[0].maxMaNhanVien) + 1;
    const newMaNhanVien = `NV${nextNumberNV.toString().padStart(3, "0")}`;

    const today = new Date();
    const ngayBatDauLamViec = today.toISOString().split("T")[0]; 

    await connection.execute(
      `INSERT INTO NhanVienThuVien 
        (MaNhanVien, MaTK, HoTen, NgaySinh, DiaChi, Email, SoDienThoai, GioiTinh, NgayBatDauLamViec, ChucVu, Luong)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [newMaNhanVien, newMaTK, name, birthDate, address, email, phone, gender, ngayBatDauLamViec, role, salary]
    );

    return {
      success: true,
      message: "Nhân viên đã được tạo thành công.",
      MaTK: newMaTK,
      MaNhanVien: newMaNhanVien,
    };
  } catch (error) {
    console.error("Error creating employee:", error);
    return { success: false, message: error.message };
  } finally {
    await connection.end();
  }
}

module.exports = themNhanVien;
