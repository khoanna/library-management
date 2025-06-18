const editNamXuatBan = require("../services/sach/editNamXuatBan");
const addTheLoai = require("../services/sach/editTheLoai");
const getEditSach = require("../services/sach/getEditSach");
const getSachData = require("../services/phieuMuon/getSachData");
const addSach = require("../services/sach/nhapSach");
const them = require("../services/sach/them");
const xoaTheLoai = require("../services/sach/deleteTheLoai");
const xoaSach = require("../services/sach/deleteSach");

class SachController {
    async index(req, res) {
        const data = await getSachData();
        res.json(data);
    }

    async theloai(req, res) {
        const { tenTheLoai } = req.body;
        const data = await addTheLoai(tenTheLoai);
        res.json(data);
    }

    async xoaTheLoai(req, res) {
        const { tenTheLoai } = req.body;
        const data = await xoaTheLoai(tenTheLoai);
        res.json(data);
    }

    async nam(req, res) {
        const { nam } = req.body;
        const data = await editNamXuatBan(nam);
        res.json(data);
    }

    async editFormSach(req, res) {
        const data = await getEditSach();
        res.json(data);
    }

    async xoa(req, res) {
        const { MaSach } = req.body;
        const data = await xoaSach(MaSach);
        res.json(data);
    }

    async nhap(req, res) {
        const { TenSach, MaTheLoai, MaTacGia, NamXuatBan, NhaXuatBan, GiaSach, SoLuong } = req.body;
        const sach = {
            TenSach,
            MaTheLoai,
            MaTacGia,
            NamXuatBan,
            NhaXuatBan,
            GiaSach,
            SoLuong
        };
        console.log(sach);

        const data = await addSach(sach);
        res.json(data);
    }

    async them(req, res) {
        const { MaSach, SoLuong } = req.body;
        const sach = {
            MaSach,
            SoLuong
        };
        const data = await them(sach);
        res.json(data);
    }
}

module.exports = new SachController();