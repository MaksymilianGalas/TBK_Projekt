const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAchievements, addAchievement } = require('../controllers/achievementsController');

const router = express.Router();

router.get('/', authMiddleware, getAchievements);
router.post('/add', authMiddleware, addAchievement);

module.exports = router;
