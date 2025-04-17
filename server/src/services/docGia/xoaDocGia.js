const createConnection = require('../../config/dbconnect.js');

async function xoaDocGia(MaDocGia) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(
            'DELETE FROM DocGia WHERE MaDocGia = ?',
            [MaDocGia])

        return result;
    } catch (error) {
        return "err";
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

module.exports = xoaDocGia;
