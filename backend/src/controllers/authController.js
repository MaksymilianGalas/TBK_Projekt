const logout = (req, res) => {
    // todo usunięcie tokena z frontendu
    res.json({ message: 'User logged out successfully' });
};

module.exports = { logout };
