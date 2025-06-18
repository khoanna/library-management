const createConnection = require('../../config/dbconnect.js');

async function getPhieuMuonData() {
    const connection = await createConnection();
    try {
        let responeData = {};

        const [danhSachPhieuMuon] = await connection.query(` SELECT pm.*, 
             CASE WHEN COUNT(pt.MaPhieuTra) > 0 THEN 1 ELSE 0 END AS daCoPhieuTra
      FROM PhieuMuon pm
      LEFT JOIN PhieuTra pt ON pm.MaPhieuMuon = pt.MaPhieuMuon
      GROUP BY pm.MaPhieuMuon
    `)
        responeData.danhSachPhieuMuon = danhSachPhieuMuon;

        return responeData;
    } catch (error) {
        console.log(error);
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

module.exports = getPhieuMuonData;