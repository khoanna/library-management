const createConnection = require('../../config/dbconnect.js');

async function editSachToiDa(sach) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`CALL CapNhatSoLuongMuonToiDa(${sach});`);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = editSachToiDa;
