const createConnection = require('../../config/dbconnect.js');

async function addTheLoai(tenTheLoai) {
    const connection = await createConnection();
    try {

        const [rows] = await connection.execute('SELECT MAX(CAST(SUBSTRING(MaTheLoai, 3) AS UNSIGNED)) AS maxTheLoai FROM TheLoaiSach');

        const nextTheLoaiNumber = (rows[0].maxTheLoai ? Number(rows[0].maxTheLoai) + 1 : 1);

        const newMaTheLoai = `TL${nextTheLoaiNumber.toString().padStart(3, '0')}`;

        const [result] = await connection.execute(`INSERT INTO TheLoaiSach (MaTheLoai, TenTheLoai, MoTa) VALUES (?, ?, ?)`, [newMaTheLoai, tenTheLoai, "Mo ta"]);

        return result;
    } catch (error) {
        console.error("Error adding category: ", error);
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = addTheLoai;
