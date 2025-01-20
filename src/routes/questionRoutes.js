const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addQuestion, deleteQuestion } = require('../controllers/questionController');

const router = express.Router();

router.post('/:quizId', authMiddleware, addQuestion);
router.delete('/:id', authMiddleware, deleteQuestion);

module.exports = router;
