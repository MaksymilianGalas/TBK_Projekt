const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [
        {
            text: { type: String },
            isCorrect: { type: Boolean, default: false },
        },
    ],
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
});

module.exports = mongoose.model('Question', questionSchema);
