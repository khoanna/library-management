const createConnection = require('../../config/dbconnect.js');

async function editTienPhat(tien) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`UPDATE QuyDinh SET GiaTri = ${tien} WHERE TenQuyDinh = 'MucPhat';`);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = editTienPhat;
