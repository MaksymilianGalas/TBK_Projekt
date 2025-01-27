const Result = require('../models/result');
const User = require('../models/user');

const getRankings = async (req, res) => {
    try {
        const rankings = await Result.aggregate([
            {
                $group: {
                    _id: '$user',
                    totalScore: { $sum: '$score' },
                },
            },
            {
                $sort: { totalScore: -1 },
            },
            {
                $limit: 10,
            },
        ]).exec();

        const populatedRankings = await User.populate(rankings, { path: '_id', select: 'email' });

        res.json(populatedRankings);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch rankings', details: err.message });
    }
};

module.exports = { getRankings };
