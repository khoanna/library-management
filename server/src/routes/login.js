const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify')

const loginController = require('../controllers/LoginController')

// [/login/auth]
router.use('/auth', verifyToken ,loginController.auth)

// [/login]
router.use('/', loginController.index)

module.exports = router;