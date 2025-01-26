const Points = require('../models/points');

const getPoints = async (req, res) => {
    try {
        const points = await Points.findOne({ user: req.user.userId });
        if (!points) {
            return res.status(404).json({ message: 'No points found' });
        }
        res.json(points);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch points' });
    }
};

const addPoints = async (req, res) => {
    try {
        const { pointsToAdd } = req.body;

        let points = await Points.findOne({ user: req.user.userId });
        if (!points) {
            points = new Points({ user: req.user.userId, totalPoints: pointsToAdd });
        } else {
            points.totalPoints += pointsToAdd;
        }

        await points.save();
        res.json(points);
    } catch (err) {
        res.status(500).json({ error: 'Could not add points' });
    }
};

module.exports = { getPoints, addPoints };
