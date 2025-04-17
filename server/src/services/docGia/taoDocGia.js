const createConnection = require('../../config/dbconnect.js');

async function themDocGia(HoTen, LoaiDocGia, NgaySinh, DiaChi, Email, SoDienThoai, GioiTinh, NgayLamThe, NgayHetHan) {
    const connection = await createConnection();
    try {

        const [rows] = await connection.execute('SELECT MAX(CAST(SUBSTRING(MaDocGia, 2) AS UNSIGNED)) AS maxDocGia FROM DocGia');
        const nextDocGiaNumber = rows[0].maxDocGia + 1 || 1;
        const MaDocGia = `D${nextDocGiaNumber.toString().padStart(3, '0')}`;
        const [theRows] = await connection.execute('SELECT MAX(CAST(SUBSTRING(MaThe, 4) AS UNSIGNED)) AS maxMaThe FROM DocGia');
        const nextMaTheNumber = theRows[0].maxMaThe + 1 || 1;
        const MaThe = `THE${nextMaTheNumber.toString().padStart(3, '0')}`;

        console.log(GioiTinh);

        const [result] = await connection.execute(
            `
        INSERT INTO DocGia (
            MaDocGia,
            MaThe,
            HoTen,
            LoaiDocGia,
            NgaySinh,
            DiaChi,
            Email,
            SoDienThoai,
            GioiTinh,
            NgayLamThe,
            NgayHetHan
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [
                MaDocGia,
                MaThe,
                HoTen,
                LoaiDocGia,
                NgaySinh,
                DiaChi,
                Email,
                SoDienThoai,
                GioiTinh,
                NgayLamThe,
                NgayHetHan
            ]
        );

        return result;
    } catch (error) {
        return error;
    } finally {
        if (connection) {
            connection.end();
        }
    }

}

module.exports = themDocGia;
