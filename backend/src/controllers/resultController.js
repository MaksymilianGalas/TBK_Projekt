const Result = require('../models/result');
const Quiz = require('../models/quiz');
const UserPoints = require('../models/UserPoints');


const clearOldResults = async (req, res) => {  //testowalem aplikacje na innych danych niz sa teraz uzywane, stad ta funkcja
    try {
        const { quizId } = req.params;

        await Result.deleteMany({ quiz: quizId });

        res.json({ message: 'Old results cleared successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Could not clear old results', details: err.message });
    }
};

const getResultsByQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        const results = await Result.find({ quiz: quizId }).populate('user', 'email');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch results', details: err.message });
    }
};

const submitResult = async (req, res) => {
    try {
        const { score } = req.body;
        const { quizId } = req.params;

        // Walidacja danych
        if (score < 0) {
            return res.status(400).json({ message: 'Score cannot be negative' });
        }

        const existingResult = await Result.findOne({ user: req.user.userId, quiz: quizId });
        if (existingResult) {
            return res.status(400).json({ message: 'Result already submitted for this quiz.' });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const result = new Result({
            user: req.user.userId,
            quiz: quizId,
            score,
        });

        await result.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Could not submit result', details: err.message });
    }
};



module.exports = { submitResult, getResultsByQuiz, clearOldResults };
