const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // użytkownik, który śledzi
    followed: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // użytkownik śledzony
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Follow', followSchema);
