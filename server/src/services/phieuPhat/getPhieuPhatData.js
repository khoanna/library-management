const createConnection = require('../../config/dbconnect.js');

async function getPhieuPhatData() {
    const connection = await createConnection();
    try {
        let responeData = {};

        const [danhSachPhieuPhat] = await connection.query(`SELECT * FROM PhieuPhat;`)
        responeData.danhSachPhieuPhat = danhSachPhieuPhat;

        return responeData;
    } catch (error) {
        console.log(error);
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getPhieuPhatData;