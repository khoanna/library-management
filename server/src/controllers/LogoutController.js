class LoginController {
    async index(req, res) {

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.json("Remove cookie successful!");

    }
}

module.exports = new LoginController