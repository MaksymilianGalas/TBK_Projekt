const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
    try {
        const { title, description } = req.body;
        const quiz = new Quiz({
            title,
            description,
            creator: req.user.userId,
        });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        res.status(500).json({ error: 'Could not create quiz' });
    }
};

const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('creator', 'email');
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch quizzes' });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch quiz' });
    }
};

const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: 'Could not update quiz' });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json({ message: 'Quiz deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete quiz' });
    }
};

const searchQuizzes = async (req, res) => {
    try {
        const { title } = req.query;
        const quizzes = await Quiz.find({ title: new RegExp(title, 'i') });
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Could not search quizzes' });
    }
};

module.exports = { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz, searchQuizzes };
