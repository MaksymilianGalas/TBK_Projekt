const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { shareQuiz, followUser } = require('../controllers/socialController');

const router = express.Router();

router.post('/share', authMiddleware, shareQuiz);
router.post('/follow', authMiddleware, followUser);

module.exports = router;
