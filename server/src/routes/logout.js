const express = require('express');
const router = express.Router();

const LogoutController = require('../controllers/LogoutController')

// [/logout]
router.use('/', LogoutController.index)

module.exports = router;