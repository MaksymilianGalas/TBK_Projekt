const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getRankings } = require('../controllers/rankingsController');

const router = express.Router();

router.get('/', authMiddleware, getRankings);

module.exports = router;
