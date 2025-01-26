const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const createQuiz = async (req, res) => {
    try {
        console.log('Body data:', req.body);

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const quiz = new Quiz({
            title,
            description,
            creator: req.user.userId,
        });

        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        console.error('Error during quiz creation:', err.message);
        res.status(500).json({ error: 'Could not create quiz' });
    }
};

const participate = async (req, res) => {
    try {
        const quizId = req.params.id;
        const userAnswers = req.body.answers;

        const quiz = await Quiz.findById(quizId).populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const results = quiz.questions.map((question) => {
            const userAnswer = userAnswers.find(
                (a) => a.questionId === question._id.toString()
            );
            const correctOption = question.options.find((opt) => opt.isCorrect);

            return {
                questionId: question._id,
                questionText: question.text,
                userAnswer: userAnswer ? userAnswer.answer : null,
                correctAnswer: correctOption ? correctOption.text : null,
                isCorrect: userAnswer && userAnswer.answer === correctOption.text,
            };
        });


        const correctAnswers = results.filter((r) => r.isCorrect).length;

        res.json({
            message: 'Quiz participation complete',
            correctAnswers,
            totalQuestions: quiz.questions.length,
            results,
        });
    } catch (err) {
        res.status(500).json({ error: 'Could not participate in quiz', details: err.message });
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
        const quiz = await Quiz.findById(req.params.id).populate({
            path: 'questions',
            select: 'text options',
        });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch quiz', details: err.message });
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

module.exports = { createQuiz, getAllQuizzes, getQuizById, participate, updateQuiz, deleteQuiz, searchQuizzes };
