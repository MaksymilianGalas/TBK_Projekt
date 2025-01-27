const mongoose = require('mongoose');

const GraphicQuestionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    answers: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model('GraphicQuestion', GraphicQuestionSchema);
