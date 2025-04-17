const createConnection = require('../../config/dbconnect.js');

async function editNgayMuon(ngay) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`CALL CapNhatSoNgayHenTraToiDa(${ngay});`);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = editNgayMuon;
