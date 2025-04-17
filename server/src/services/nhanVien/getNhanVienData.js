const createConnection = require('../../config/dbconnect.js');

async function getNhanVienData() {
    const connection = await createConnection();
    try {
        let responeData = {};

        const [nhanVien] = await connection.query("SELECT nv.*, tk.Email, tk.MatKhau FROM NhanVienThuVien nv JOIN TaiKhoan tk ON nv.MaTK = tk.MaTK;")
        responeData.danhSachNhanVien = nhanVien;


        return responeData;
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getNhanVienData;