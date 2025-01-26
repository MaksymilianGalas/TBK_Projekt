const mongoose = require('mongoose');

const personalizationItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String }, // opcjonalny opis
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('PersonalizationItem', personalizationItemSchema);
