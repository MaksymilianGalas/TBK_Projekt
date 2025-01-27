const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getHint,
} = require('../controllers/questionController');

const router = express.Router();

router.post('/:quizId', authMiddleware, addQuestion);
router.put('/:id', authMiddleware, updateQuestion);
router.get('/:questionId/hint', authMiddleware, getHint);

router.delete('/:id', authMiddleware, deleteQuestion);

module.exports = router;
