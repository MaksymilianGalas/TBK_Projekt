const Points = require('../models/points');
const User = require('../models/user');

const getRankings = async (req, res) => {
    try {
        const rankings = await Points.find()
            .sort({ totalPoints: -1 }) // sortowanie od największej liczby punktów
            .populate('user', 'email');
        res.json(rankings);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch rankings' });
    }
};

module.exports = { getRankings };
