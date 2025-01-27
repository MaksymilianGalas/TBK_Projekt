const Question = require('../models/question');
const Quiz = require('../models/quiz');

const addQuestion = async (req, res) => {
    try {
        const { text, options } = req.body;
        const { quizId } = req.params;

        if (!text || !options || options.length < 2) {
            return res.status(400).json({ message: 'Text and at least two options are required' });
        }

        const correctAnswersCount = options.filter((o) => o.isCorrect).length;
        if (correctAnswersCount !== 1) {
            return res.status(400).json({ message: 'Exactly one correct answer is required' });
        }

        const question = new Question({ text, options, quiz: quizId });
        await question.save();

        const quiz = await Quiz.findById(quizId);
        quiz.questions.push(question._id);
        await quiz.save();


        const formattedQuestion = {
            _id: question._id,
            text: question.text,
            options: question.options.map((o) => ({
                text: o.text,
                isCorrect: o.isCorrect,
            })),
        };

        res.status(201).json(formattedQuestion);
    } catch (err) {
        res.status(500).json({ error: 'Could not add question', details: err.message });
    }
};



const updateQuestion = async (req, res) => {
    try {
        const { text, options } = req.body;
        const { id } = req.params;

        const question = await Question.findByIdAndUpdate(
            id,
            { text, options },
            { new: true }
        );

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json(question);
    } catch (err) {
        res.status(500).json({ error: 'Could not update question', details: err.message });
    }
};

const getHint = async (req, res) => {
    try {
        const { questionId } = req.params;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }


        const incorrectOptions = question.options.filter(option => !option.isCorrect);
        if (incorrectOptions.length <= 2) {
            return res.json({ hint: question.options });
        }

        const remainingIncorrect = incorrectOptions
            .sort(() => 0.5 - Math.random())
            .slice(0, incorrectOptions.length - 2);

        const hintedOptions = question.options.filter(option =>
            remainingIncorrect.includes(option) || option.isCorrect
        );

        res.json({ hint: hintedOptions });
    } catch (err) {
        console.error('Error fetching hint:', err.message);
        res.status(500).json({ error: 'Could not fetch hint' });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }


        await Quiz.updateOne(
            { questions: id },
            { $pull: { questions: id } }
        );

        res.json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete question', details: err.message });
    }
};

module.exports = { addQuestion, deleteQuestion, updateQuestion, getHint };
