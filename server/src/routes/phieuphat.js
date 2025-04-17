const express = require('express');
const router = express.Router();

const phieuphatController = require('../controllers/PhieuphatController');
const verifyToken = require('../middleware/verify');

// [/phieuphat/taophieu]
router.use('/taophieu', verifyToken, phieuphatController.taoPhieuPhat)
// [/phieuphat/nopphat]
router.use('/nopphat', verifyToken, phieuphatController.nopPhat)
// [/phieuphat]
router.use('/', verifyToken, phieuphatController.index)

module.exports = router;