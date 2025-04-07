const createConnection = require('../../config/dbconnect.js');

async function getEditSach() {
    const connection = await createConnection();
    try {
        const respone = {};

        const [allAuthors] = await connection.execute('SELECT * FROM TacGia');
        respone.tacGia = allAuthors;

        const [allPublishers] = await connection.execute('SELECT * FROM NhaXuatBan');
        respone.NXB = allPublishers;

        const [allGenres] = await connection.execute('SELECT * FROM TheLoaiSach');
        respone.theLoai = allGenres;

        return respone;
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getEditSach;
