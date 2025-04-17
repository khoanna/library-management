const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify')
const sachController = require('../controllers/SachController')

// [/sach/nhap]
router.use('/nhap', verifyToken, sachController.nhap)

// [/sach/thongtin]
router.use('/thongtin', verifyToken, sachController.editFormSach)

// [/sach/nam]
router.use('/nam', verifyToken, sachController.nam)

// [/sach/theloai]
router.use('/theloai', verifyToken, sachController.theloai)

// [/sach]
router.use('/', verifyToken, sachController.index)

module.exports = router;