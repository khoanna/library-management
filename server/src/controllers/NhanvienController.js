const themNhanVien = require("../services/nhanVien/themNhanVien");
const getNhanVienData = require("../services/nhanVien/getNhanVienData");
const xoaNhanVien = require("../services/nhanVien/xoaNhanVien");

class NhanvienController {
    async index(req, res) {
        const data = await getNhanVienData();
        res.json(data);
    }

    async them(req, res) {
        const { name, email, password, birthDate, address, gender, phone, role, salary } = req.body;
        const data = await themNhanVien(name, email, password, birthDate, address, gender, phone, role, salary);
        res.json(data);
    }

    async xoa(req, res) {
        const { id } = req.body;
        const data = await xoaNhanVien(id);
        res.json(data);
    }
}

module.exports = new NhanvienController();