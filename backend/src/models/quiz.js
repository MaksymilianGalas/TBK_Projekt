const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
        {
            text: { type: String, required: true },
            options: [
                {
                    text: { type: String, required: true },
                    isCorrect: { type: Boolean, required: true },
                },
            ],
        },
    ],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Quiz', quizSchema);
