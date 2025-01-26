const Achievement = require('../models/Achievement');

const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find({ user: req.user.userId });
        res.json(achievements);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch achievements' });
    }
};

const addAchievement = async (req, res) => {
    try {
        const { title, description } = req.body;
        const achievement = new Achievement({
            user: req.user.userId,
            title,
            description,
        });
        await achievement.save();
        res.status(201).json(achievement);
    } catch (err) {
        res.status(500).json({ error: 'Could not add achievement' });
    }
};

module.exports = { getAchievements, addAchievement };
