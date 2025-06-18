const createConnection = require('../../config/dbconnect.js');

async function nopPhat(MaPhieuPhat) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`UPDATE PhieuPhat SET TrangThai = 'Đã thanh toán' WHERE MaPhieuPhat = '${MaPhieuPhat}';`);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = nopPhat;
