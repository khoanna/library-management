const createConnection = require('../../config/dbconnect.js');

async function giaHan(soThang, maDocGia) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(
            `UPDATE DocGia
             SET NgayHetHan = DATE_ADD(NgayHetHan, INTERVAL ? MONTH)
             WHERE MaDocGia = ?;`,
            [soThang, maDocGia]
        );
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = giaHan;
