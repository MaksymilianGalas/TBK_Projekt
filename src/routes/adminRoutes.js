const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const { getAllUsers, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.get('/users', authMiddleware, isAdmin, getAllUsers);
router.delete('/users/:id', authMiddleware, isAdmin, deleteUser);

module.exports = router;
