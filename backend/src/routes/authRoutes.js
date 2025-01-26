const express = require('express');
const { logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/logout', authMiddleware, logout);

module.exports = router;
