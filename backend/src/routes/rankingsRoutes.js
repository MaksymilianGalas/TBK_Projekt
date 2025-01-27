const express = require('express');
const { getRankings } = require('../controllers/rankingsController');

const router = express.Router();

router.get('/', getRankings);

module.exports = router;
