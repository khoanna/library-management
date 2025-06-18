const getDocGiaData = require("../services/docGia/getDocGiaData");
const editTuoi = require("../services/docGia/editTuoiQuyDinh");
const editTuoiMax = require("../services/docGia/editTuoiMax");
const editSachToiDa = require("../services/docGia/editSachMuonToiDa")
const editNgayMuon = require("../services/docGia/editNgayMuon")
const editTienPhat = require("../services/docGia/editTienPhat")
const editThang = require("../services/docGia/editThang")
const themDocGia = require("../services/docGia/taoDocGia")
const xoaDocGia = require("../services/docGia/xoaDocGia");
const giaHan = require("../services/docGia/giaHan");

class DocgiaController {
    async index(req, res) {
        const data = await getDocGiaData();
        res.json(data);
    }

    async editTuoiQuyDinh(req, res) {
        const { tuoi } = req.body;

        const data = await editTuoi(tuoi);
        res.json(`Sua tuoi quy dinh thanh cong: ${tuoi}`);
    }

    async editTuoiQuyDinhMax(req, res) {
        const { tuoi } = req.body;

        const data = await editTuoiMax(tuoi);
        res.json(`Sua tuoi quy dinh thanh cong: ${tuoi}`);
    }

    async editSachToiDa(req, res) {
        const { sach } = req.body;
        const data = await editSachToiDa(sach);
        res.json(`Sua sach quy dinh thanh cong: ${sach}`);
    }

    async editNgayMuonToiDa(req, res) {
        const { ngay } = req.body;
        const data = await editNgayMuon(ngay);
        res.json(`Sua ngay muon quy dinh thanh cong: ${ngay}`);
    }

    async editThang(req, res) {
        const { thang } = req.body;
        const data = await editThang(thang);
        res.json(`Sua thanh cong: ${thang}`);
    }

    async editTienPhatCoBan(req, res) {
        const { tien } = req.body;
        const data = await editTienPhat(tien);
        res.json(`Sua tien phat co ban thanh cong: ${tien}`);
    }

    async taoMoiDocGia(req, res) {
        const info = req.body;
        const data = await themDocGia(info.hoTen, info.loaiDocGia, info.ngaySinh, info.diaChi, info.email, info.soDienThoai, info.gioiTinh, info.ngayLamThe, info.ngayHetHan)
        res.json(`Them doc gia thanh cong`);
    }

    async xoa(req, res) {
        const { id } = req.body;
        const data = await xoaDocGia(id);
        res.json(`Xoa thanh cong doc gia ${id}`);
    }

    async giaHan(req, res) {
        const { id, thang } = req.body;
        const data = await giaHan(thang, id);
        res.json("Gia han thanh cong!");
    }
}

module.exports = new DocgiaController();