const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    participate,
    searchQuizzes,
    getGraphicQuestions,
    createGraphicQuiz,
    editQuiz,
    //getHint,
} = require('../controllers/quizController');

const router = express.Router();

router.post('/custom', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    const newQuiz = { title, description, userId: req.user.userId };
    console.log('Quiz stworzony:', newQuiz);
    res.status(201).json({ message: 'Quiz created successfully!' });
});
router.get('/graphic/:quizId', authMiddleware, getGraphicQuestions);
router.post('/graphic', authMiddleware, createGraphicQuiz);
router.put('/:id', authMiddleware, editQuiz);
router.post('/', authMiddleware, createQuiz);
//router.get('/:quizId/hint/:questionId', getHint);
router.get('/', getAllQuizzes);
router.get('/search', searchQuizzes);
router.get('/:id', getQuizById);
router.put('/:id', authMiddleware, updateQuiz);
router.delete('/:id', authMiddleware, deleteQuiz);
router.post('/:id/participate', authMiddleware, participate);

module.exports = router;
