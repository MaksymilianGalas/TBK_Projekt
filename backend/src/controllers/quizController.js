const Quiz = require('../models/quiz');
const Question = require('../models/question');
const GraphicQuestion = require('../models/GraphicQuestion');

const createQuiz = async (req, res) => {
    try {
        const { title, description, questions } = req.body;


        if (!title || !description || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Quiz must have a title, description, and at least one question.' });
        }


        const quiz = new Quiz({
            title,
            description,
            questions,
            creator: req.user.userId,
        });

        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        console.error('Error creating quiz:', err.message);
        res.status(500).json({ error: 'Could not create quiz', details: err.message });
    }
};



const editQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, questions } = req.body;

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }


        quiz.title = title || quiz.title;
        quiz.description = description || quiz.description;


        if (questions && Array.isArray(questions)) {
            for (const q of questions) {
                if (q._id) {

                    await Question.findByIdAndUpdate(q._id, {
                        text: q.text,
                        options: q.options,
                    });
                } else {

                    const newQuestion = new Question({
                        text: q.text,
                        options: q.options,
                        quiz: quiz._id,
                    });
                    await newQuestion.save();
                    quiz.questions.push(newQuestion._id);
                }
            }
        }

        await quiz.save();
        res.json({ message: 'Quiz updated successfully!', quiz });
    } catch (err) {
        console.error('Error editing quiz:', err.message);
        res.status(500).json({ error: 'Could not edit quiz' });
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

const getGraphicQuestions = async (req, res) => {
    try {
        const { quizId } = req.params;
        const questions = await GraphicQuestion.find({ quizId });
        if (!questions.length) {
            return res.status(404).json({ message: 'No questions found for this quiz' });
        }
        res.json(questions);
    } catch (error) {
        console.error('Error fetching graphic questions:', error.message);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};


const createGraphicQuiz = async (req, res) => {
    try {
        const { title, description, questions } = req.body;


        const newQuiz = new Quiz({
            title,
            description,
            type: 'graphic',
            userId: req.user.userId,
        });
        const savedQuiz = await newQuiz.save();


        const graphicQuestions = questions.map((question) => ({
            quizId: savedQuiz._id,
            text: question.text,
            image: question.image,
            answers: question.answers,
            correctAnswer: question.correctAnswer,
        }));
        await GraphicQuestion.insertMany(graphicQuestions);

        res.status(201).json({ message: 'Graphic quiz created successfully!' });
    } catch (error) {
        console.error('Error creating graphic quiz:', error.message);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};


const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('creator', '_id email'); // Dodajemy ID i email twórcy
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch quizzes' });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
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
        const { title, description, questions } = req.body;

        if (!title || !description || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Quiz must have a title, description, and at least one question.' });
        }

        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { title, description, questions },
            { new: true }
        );

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: 'Could not update quiz', details: err.message });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }


        await Question.deleteMany({ quiz: quiz._id });
        res.json({ message: 'Quiz and related questions deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete quiz', details: err.message });
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

module.exports = { createQuiz, getAllQuizzes, getQuizById, participate, updateQuiz, deleteQuiz, searchQuizzes, getGraphicQuestions, createGraphicQuiz,editQuiz };
