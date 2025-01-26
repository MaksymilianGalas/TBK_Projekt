const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getPoints, addPoints } = require('../controllers/pointsController');

const router = express.Router();

router.get('/', authMiddleware, getPoints);
router.post('/add', authMiddleware, addPoints);

module.exports = router;
