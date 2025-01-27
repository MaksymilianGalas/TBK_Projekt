const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAchievements, addAchievement, checkAchievements } = require('../controllers/achievementsController');

const router = express.Router();

router.get('/', authMiddleware, getAchievements);
router.post('/add', authMiddleware, addAchievement);
router.get('/check', authMiddleware, checkAchievements);

module.exports = router;
