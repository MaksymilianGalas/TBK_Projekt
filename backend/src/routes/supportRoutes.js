const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { submitTicket } = require('../controllers/supportController');

const router = express.Router();

router.post('/tickets', authMiddleware, submitTicket);

module.exports = router;
