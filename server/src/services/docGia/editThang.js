const createConnection = require('../../config/dbconnect.js');

async function editThang(thang) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`CALL CapNhatThoiHanTheDocGia(${thang})`);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = editThang;
