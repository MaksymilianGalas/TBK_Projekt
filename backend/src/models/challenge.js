const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    reward: { type: Number, required: true }, // nagroda za ukończenie
    dateCreated: { type: Date, default: Date.now },
    completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Challenge', challengeSchema);
