const submitTicket = (req, res) => {
    const { issue } = req.body;
    res.json({ message: 'Support ticket submitted', issue });
};

module.exports = { submitTicket };
