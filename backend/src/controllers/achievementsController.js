const Achievement = require('../models/achievement');

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

const checkAchievements = async (req, res) => {
    try {
        const userId = req.user.userId;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const achievements = await Achievement.find({ user: userId });


        const predefinedAchievements = [
            { name: 'First 10 Points', description: 'Score 10 points.', criteria: 10 },
            { name: 'Quiz Master', description: 'Score 50 points.', criteria: 50 },
        ];


        for (const ach of predefinedAchievements) {
            const existingAchievement = achievements.find(a => a.name === ach.name);
            if (!existingAchievement && user.points >= ach.criteria) {
                const newAchievement = new Achievement({
                    ...ach,
                    unlocked: true,
                    user: userId,
                });
                await newAchievement.save();
            }
        }

        const updatedAchievements = await Achievement.find({ user: userId });
        res.json(updatedAchievements);
    } catch (err) {
        console.error('Error checking achievements:', err.message);
        res.status(500).json({ error: 'Could not check achievements' });
    }
};

module.exports = { getAchievements, addAchievement, checkAchievements };
