const jwt = require("jsonwebtoken");
require("dotenv").config();


const key = process.env.JWT_SECRET

const getUsers = require('../services/login/getAccount')

class LoginController {
    async index(req, res) {
        const { email, password } = req.body;
        const users = await getUsers();

        const user = users.find(user => user.Email === email && user.MatKhau === password);
        if (!user) {
            return res.status(401)
                .json({
                    message: 'Unauthorized'
                })
        }
        const token = jwt.sign({ MaTK: user.MaTK, TenTK: user.TenTK, VaiTro: user.VaiTro }, key, { expiresIn: "3600000ms" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000
        });
        res.json("Set cookie successful!");
    }

    async auth(req, res) {
        const users = await getUsers();

        const data = req.user;
        const user = users?.find(user => user.MaTK === data.MaTK);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            res.json({ user });
        }
    }
}

module.exports = new LoginController