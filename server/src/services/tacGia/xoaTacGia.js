const createConnection = require('../../config/dbconnect');

async function xoaTacGia(maTacGia) {
    const connection = await createConnection();
    try {
        const respone = {};

        const [result] = await connection.execute(
            'DELETE FROM TacGia WHERE MaTacGia = ?',
            [maTacGia]
        );

        return respone;

    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = xoaTacGia;
