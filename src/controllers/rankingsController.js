const Points = require('../models/Points');
const User = require('../models/User');

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
