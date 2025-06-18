const express = require('express');
const router = express.Router();

const phieumuonController = require('../controllers/PhieumuonController');
const verifyToken = require('../middleware/verify');

// [/phieumuon/tra]
router.use('/tra', verifyToken, phieumuonController.tra)

// [/phieumuon/tao]
router.use('/tao', verifyToken, phieumuonController.taoPhieu)

// [/phieumuon/sach]
router.use('/sach', verifyToken, phieumuonController.laySach)

// [/phieumuon]
router.use('/', verifyToken, phieumuonController.index)

module.exports = router;