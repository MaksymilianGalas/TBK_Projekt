const Question = require('../models/question');
const Quiz = require('../models/quiz');

const addQuestion = async (req, res) => {
    try {
        const { text, options } = req.body;
        const { quizId } = req.params;

        const question = new Question({ text, options, quiz: quizId });
        await question.save();

        const quiz = await Quiz.findById(quizId);
        quiz.questions.push(question._id);
        await quiz.save();

        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: 'Could not add question' });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete question' });
    }
};

module.exports = { addQuestion, deleteQuestion };
