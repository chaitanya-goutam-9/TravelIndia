const express = require('express');
const router = express.Router();
const { login, logout, refresh } = require('../controller/adminAuthController');
const adminAuth = require('../Middleware/adminAuth');

router.post('/login', login);
router.post('/logout', adminAuth, logout);
router.post('/refresh', refresh);

module.exports = router;
