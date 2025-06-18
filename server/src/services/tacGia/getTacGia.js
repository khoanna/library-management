const createConnection = require('../../config/dbconnect');

async function getTacGia() {
    const connection = await createConnection();
    try {
        const respone = {};

        const [allAuthors] = await connection.execute('SELECT * FROM TacGia');
        respone.tacGia = allAuthors;
        return respone;

    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getTacGia;
