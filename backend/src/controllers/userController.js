const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


const unlockPremium = async (req, res) => {
    try {
        const userId = req.user.userId;


        const topUser = await User.find().sort({ points: -1 }).limit(1);

        if (!topUser.length) {
            return res.status(404).json({ message: 'No users found in the ranking.' });
        }

        if (topUser[0]._id.toString() !== userId) {
            return res.status(403).json({ message: 'Only the top user in the ranking can unlock Premium.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.isPremium) {
            return res.status(400).json({ message: 'You are already a Premium user.' });
        }


        user.isPremium = true;
        await user.save();

        res.json({ message: 'Premium status unlocked!' });
    } catch (err) {
        console.error('Error unlocking premium:', err.message);
        res.status(500).json({ error: 'Could not unlock premium' });
    }
};



const getTotalPoints = async (req, res) => {
    try {
        const userId = req.user.userId;


        const results = await Result.find({ user: userId });
        const totalPoints = results.reduce((sum, result) => sum + (result.score || 0), 0);


        const user = await User.findById(userId);
        user.points = totalPoints;
        await user.save();

        res.json({ points: totalPoints });
    } catch (err) {
        console.error('Error fetching total points:', err.message);
        res.status(500).json({ error: 'Could not fetch points' });
    }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        console.error("Login error:", err); //debugowanie bledow
        res.status(500).json({ error: 'Server error' });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // ukryj hasło
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch user', details: err.message });
    }
};

const getUserStats = async (req, res) => {
    try {
        console.log('User ID:', req.user.userId);

        const results = await Result.find({ user: req.user.userId }).populate('quiz');
        console.log('Results:', results);

        const stats = results.map((result) => ({
            quizTitle: result.quiz.title,
            score: result.score,
        }));

        res.json(stats);
    } catch (err) {
        console.error('Error fetching stats:', err.message);
        res.status(500).json({ error: 'Could not fetch stats', details: err.message });
    }
};


const buyItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { itemName, cost } = req.body;

        if (!itemName || cost === undefined) {
            return res.status(400).json({ message: 'Item name and cost are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.points < cost) {
            return res.status(400).json({ message: 'Not enough points to buy this item.' });
        }


        user.points -= cost;


        user.inventory = [...(user.inventory || []), itemName];
        await user.save();

        res.json({
            message: `You have successfully bought ${itemName}!`,
            points: user.points,
            inventory: user.inventory
        });
    } catch (err) {
        console.error('Error buying item:', err.message);
        res.status(500).json({ error: 'Could not buy item' });
    }
};





module.exports = { registerUser, loginUser, getUserById, getUserStats, unlockPremium, getTotalPoints, buyItem  };
