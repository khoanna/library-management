const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin')
const docgiaController = require('../controllers/DocgiaController');
const verifyToken = require('../middleware/verify');

// [/docgia/giahan]
router.use('/giahan', verifyToken, docgiaController.giaHan)

// [/docgia/xoa]
router.use('/xoa', verifyToken, docgiaController.xoa)

// [/docgia/taomoi]
router.use('/taomoi', verifyToken, docgiaController.taoMoiDocGia)

// [/docgia/thang]
router.use('/thang', isAdmin, docgiaController.editThang)

// [/docgia/age]
router.use('/age', isAdmin, docgiaController.editTuoiQuyDinh)

// [/docgia/age]
router.use('/ageMax', isAdmin, docgiaController.editTuoiQuyDinhMax)

// [/docgia/maxbook]
router.use('/maxbook', isAdmin, docgiaController.editSachToiDa)

// [/docgia/maxday]
router.use('/maxday', isAdmin, docgiaController.editNgayMuonToiDa)

// [/docgia/tienphat]
router.use('/tienphat', isAdmin, docgiaController.editTienPhatCoBan)

// [/docgia]
router.use('/', verifyToken, docgiaController.index)

module.exports = router;
