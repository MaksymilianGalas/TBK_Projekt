const shareQuiz = async (req, res) => {
    try {
        const { quizId, platform } = req.body;

        res.json({ message: `Quiz ${quizId} shared successfully on ${platform}` });
    } catch (err) {
        res.status(500).json({ error: 'Could not share quiz', details: err.message });
    }
};

const followUser = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;

        res.json({ message: `You are now following user ${userIdToFollow}` });
    } catch (err) {
        res.status(500).json({ error: 'Could not follow user', details: err.message });
    }
};

module.exports = { shareQuiz, followUser };
