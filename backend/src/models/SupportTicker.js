const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issue: { type: String, required: true },
    status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
    dateCreated: { type: Date, default: Date.now },
    resolutionDate: { type: Date },
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
