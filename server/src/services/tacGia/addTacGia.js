const createConnection = require('../../config/dbconnect');

const addTacGia = async (tenTacGia, tieuSu, quocTich, ngaySinh, ngayMat) => {
    const connection = await createConnection();
    try {


        const [rows] = await connection.execute(
            'SELECT MAX(CAST(SUBSTRING(MaTacGia, 3) AS UNSIGNED)) AS maxTacGia FROM TacGia'
        );

        const nextTacGiaNumber = (Number(rows[0].maxTacGia) + 1) || 1;
        const newMaTacGia = `TG${nextTacGiaNumber.toString().padStart(3, '0')}`;

        const [result] = await connection.execute(
            'INSERT INTO TacGia (MaTacGia, TenTacGia, TieuSu, QuocTich, NgaySinh, NgayMat) VALUES (?, ?, ?, ?, ?, ?)',
            [newMaTacGia, tenTacGia, tieuSu, quocTich, ngaySinh, ngayMat]
        );

        console.log("them tac gia thanh cong", newMaTacGia);

        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

module.exports = addTacGia;