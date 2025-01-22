const jwt = require('jsonwebtoken');
const express = require("express");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Pobieramy token z nagłówka

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });  // Jeśli brak tokena
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Dekodowanie tokena
        req.user = decoded;  // Przechowujemy dane użytkownika w req.user
        console.log('Zweryfikowany użytkownik:', req.user);
        console.log('Dane po authMiddleware: ', req.body);
        next();  // Przechodzimy dalej
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });  // Błąd weryfikacji tokena
    }
};


module.exports = authMiddleware;
