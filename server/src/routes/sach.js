const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify')
const isAdmin = require('../middleware/isAdmin')
const sachController = require('../controllers/SachController')

// [/sach/them]
router.use('/them', verifyToken, sachController.them)

// [/sach/nhap]
router.use('/nhap', verifyToken, sachController.nhap)

// [/sach/thongtin]
router.use('/thongtin', verifyToken, sachController.editFormSach)

// [/sach/xoa]
router.use('/xoa', verifyToken, sachController.xoa)

// [/sach/nam]
router.use('/nam', isAdmin, sachController.nam)

// [/sach/theloai]
router.use('/theloai', isAdmin, sachController.theloai)

// [/sach/xoaTheLoai]
router.use('/xoaTheLoai', isAdmin, sachController.xoaTheLoai)

// [/sach]
router.use('/', verifyToken, sachController.index)

module.exports = router;