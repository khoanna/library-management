const createConnection = require('../../config/dbconnect.js');

async function xoaTheLoai(tenTheLoai) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`DELETE FROM TheLoaiSach WHERE MaTheLoai = ?`, [tenTheLoai]);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = xoaTheLoai;
