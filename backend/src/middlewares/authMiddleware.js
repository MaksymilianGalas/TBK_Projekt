const jwt = require('jsonwebtoken');
const express = require("express");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // dekodowanie tokena
        req.user = decoded;
        console.log('Zweryfikowany użytkownik:', req.user);
        console.log('Dane po authMiddleware: ', req.body);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};


module.exports = authMiddleware;
