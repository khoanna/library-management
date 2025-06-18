const createConnection = require('../../config/dbconnect.js');

async function editTuoiMax(tuoi) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`CALL CapNhatQuyDinhTuoi('TuoiToiDa', ${tuoi});`);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = editTuoiMax;
