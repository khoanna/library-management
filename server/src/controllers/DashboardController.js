const getDashboardData = require("../services/dashboard/getDashboardData.js");

class DashboardController {
    async index(req, res) {
        const data = await getDashboardData();
        res.json(data);
    }
}

module.exports = new DashboardController();