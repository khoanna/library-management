const createConnection = require('../../config/dbconnect.js');

async function editNamXuatBan(nam) {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute(`UPDATE QuyDinh
                                                    SET GiaTri = ?
                                                    WHERE TenQuyDinh = 'NamXuatBanHopLe';`, [nam]);
        return (result);
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = editNamXuatBan;
