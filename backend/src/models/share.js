const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // ID quizu
    platform: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID użytkownika, który udostępnił
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Share', shareSchema);
