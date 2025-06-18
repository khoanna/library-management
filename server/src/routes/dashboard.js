const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify')

const dashboardController = require('../controllers/DashboardController')

// [/dashboard]
router.use('/', verifyToken, dashboardController.index)

module.exports = router;