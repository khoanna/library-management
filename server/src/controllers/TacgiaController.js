const getTacGia = require("../services/tacGia/getTacGia");
const xoaTacGia = require("../services/tacGia/xoaTacGia");
const addTacGia = require("../services/tacGia/addTacGia")

class TacgiaController {
    async index(req, res) {
        const data = await getTacGia();
        res.json(data)
    }

    async them(req, res) {
        const { tenTacGia, tieuSu, quocTich, ngaySinh, ngayMat } = req.body;    
        const data = await addTacGia(tenTacGia, tieuSu, quocTich, ngaySinh, ngayMat);
        res.json("Them tac gia thanh cong");
    }

    async xoa(req, res) {
        const { id } = req.body
        const data = await xoaTacGia(id);
        res.json("Xoa tac gia thanh cong");
    }
}

module.exports = new TacgiaController();