
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin')
const nhanvienController = require('../controllers/NhanvienController')

// [/nhanvien/xoa]
router.use('/xoa', isAdmin, nhanvienController.xoa)

// [/nhanvien/them]
router.use('/them', isAdmin, nhanvienController.them)

// [/nhanvien]
router.use('/', isAdmin, nhanvienController.index)

module.exports = router;