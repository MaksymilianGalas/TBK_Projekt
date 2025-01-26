const mongoose = require('mongoose');

const featureUnlockSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    featureName: { type: String, required: true },
    dateUnlocked: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FeatureUnlock', featureUnlockSchema);
