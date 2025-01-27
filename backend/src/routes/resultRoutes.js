const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { submitResult, getResultsByQuiz, clearOldResults } = require('../controllers/resultController');

const router = express.Router();

router.post('/:quizId', authMiddleware, submitResult);
router.get('/:quizId', authMiddleware, getResultsByQuiz);
router.get('/:quizId', authMiddleware, getResultsByQuiz);

module.exports = router;
