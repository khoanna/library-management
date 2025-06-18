const getPhieuMuonData = require("../services/phieuMuon/getPhieuMuonData");
const getSachData = require("../services/phieuMuon/getSachData");
const taoPhieuMuon = require("../services/phieuMuon/taoPhieuMuon");
const traSach = require("../services/phieuMuon/traSach");

class PhieumuonController {
    async index(req, res) {
        const data = await getPhieuMuonData();
        res.json(data);
    }

    async laySach(req, res) {
        const data = await getSachData();
        res.json(data);
    }

    async taoPhieu(req, res) {
        const user = req.user;
        const { id, ds } = req.body;
        const data = await taoPhieuMuon(id, user.MaTK, ds);
        res.json(data);
    }

    async tra(req, res) {
        const data = await traSach(req.body.MaPhieuMuon, req.body.MaDocGia, req.user.MaTK);
        res.json(data)
    }
}

module.exports = new PhieumuonController();