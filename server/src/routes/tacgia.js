const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify')

const tacgiaController = require('../controllers/TacgiaController')

// [/tacgia/xoa]
router.use('/xoa', verifyToken, tacgiaController.xoa)

// [/tacgia/add]
router.use('/add', verifyToken, tacgiaController.them)

// [/tacgia]
router.use('/', verifyToken, tacgiaController.index)

module.exports = router;