const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    criteria: { type: Number, required: true },
    unlocked: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Achievement', achievementSchema);
