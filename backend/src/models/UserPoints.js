const mongoose = require('mongoose');

const userPoints = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    points: { type: Number, required: true },
});

module.exports = mongoose.model('UserPoints', userPoints);
