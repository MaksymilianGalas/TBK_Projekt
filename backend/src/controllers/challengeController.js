const getChallenges = (req, res) => {
    res.json({
        challenges: [
            { id: 1, title: 'Complete 3 quizzes', reward: 50 },
            { id: 2, title: 'Score 100 points', reward: 100 },
        ],
    });
};

const completeChallenge = (req, res) => {
    const { challengeId } = req.body;
    res.json({ message: `Challenge ${challengeId} completed successfully` });
};

module.exports = { getChallenges, completeChallenge };
