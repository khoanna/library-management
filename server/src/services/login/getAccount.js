const createConnection = require('../../config/dbconnect.js');

async function getUsers() {
    const connection = await createConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM TaiKhoan;');
        
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getUsers;
