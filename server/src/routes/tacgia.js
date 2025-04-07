const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin')

const tacgiaController = require('../controllers/TacgiaController')

// [/tacgia/xoa]
router.use('/xoa', isAdmin, tacgiaController.xoa)

// [/tacgia/add]
router.use('/add', isAdmin, tacgiaController.them)

// [/tacgia]
router.use('/', isAdmin, tacgiaController.index)

module.exports = router;