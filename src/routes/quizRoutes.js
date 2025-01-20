const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    searchQuizzes,
} = require('../controllers/quizController');

const router = express.Router();

router.post('/', authMiddleware, createQuiz);
router.get('/', getAllQuizzes);
router.get('/search', searchQuizzes);
router.get('/:id', getQuizById);
router.put('/:id', authMiddleware, updateQuiz);
router.delete('/:id', authMiddleware, deleteQuiz);

module.exports = router;
