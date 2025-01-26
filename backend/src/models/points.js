const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, default: 0 },
});

module.exports = mongoose.model('Points', pointsSchema);
