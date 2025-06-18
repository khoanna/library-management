const createConnection = require('../../config/dbconnect.js');

async function xoaSach(maSach) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`DELETE from Sach where MaSach = ?`, [maSach]);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = xoaSach;
