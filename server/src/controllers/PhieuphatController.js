const getPhieuPhatData = require("../services/phieuPhat/getPhieuPhatData");
const nopPhat = require("../services/phieuPhat/nopPhat");
const themPhieuPhat = require("../services/phieuPhat/themPhieuPhat");

class PhieuphatController {
    async index(req, res) {
        const data = await getPhieuPhatData();
        res.json(data);
    }

    async nopPhat(req, res) {
        const { MaPhieuPhat } = req.body;
        const data = await nopPhat(MaPhieuPhat);
        res.json(`Nop phat thanh cong cho phieu phat ${MaPhieuPhat}`)
    }

    async taoPhieuPhat(req, res) {
        const user = req.user;
        const { MaDocGia, tienPhat, tienTra } = req.body;
        const TrangThai = (tienPhat == tienTra ? 'Đã thanh toán' : 'Chưa thanh toán');
        const data = await themPhieuPhat(MaDocGia, tienPhat - tienTra, tienTra, TrangThai, user.MaTK);
        if (data != "err") {
            res.json('Tao phieu phat thanh cong.')
        } else {
            res.status(400).json({ message: "Khong tim thay ma doc gia" });
        }
    }
}

module.exports = new PhieuphatController();