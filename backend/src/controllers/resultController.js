const Result = require('../models/result');
const Quiz = require('../models/quiz');

const submitResult = async (req, res) => {
    try {
        const { score } = req.body;
        const { quizId } = req.params;

        const result = new Result({
            user: req.user.userId,
            quiz: quizId,
            score,
        });

        await result.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Could not submit result' });
    }
};

const getResultsByQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        const results = await Result.find({ quiz: quizId }).populate('user', 'email');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch results' });
    }
};

module.exports = { submitResult, getResultsByQuiz };
