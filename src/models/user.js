const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

// Przed zapisaniem użytkownika hasło jest haszowane
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Jeśli hasło nie zostało zmienione, nie wykonuj hashowania
    this.password = await bcrypt.hash(this.password, 10); // Haszowanie hasła
    next();
});

// Sprawdzenie, czy model 'User' już istnieje
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
