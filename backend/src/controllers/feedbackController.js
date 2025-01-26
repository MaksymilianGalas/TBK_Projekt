const Feedback = require('../models/feedback');

const submitFeedback = async (req, res) => {
    try {
        const { email, message } = req.body;
        const feedback = new Feedback({ email, message });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Could not submit feedback' });
    }
};

module.exports = { submitFeedback };
