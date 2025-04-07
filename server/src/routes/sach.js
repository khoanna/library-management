const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin')
const sachController = require('../controllers/SachController')

// [/sach/nhap]
router.use('/nhap', isAdmin, sachController.nhap)

// [/sach/thongtin]
router.use('/thongtin', isAdmin, sachController.editFormSach)

// [/sach/nam]
router.use('/nam', isAdmin, sachController.nam)

// [/sach/theloai]
router.use('/theloai', isAdmin, sachController.theloai)

// [/sach]
router.use('/', isAdmin, sachController.index)

module.exports = router;