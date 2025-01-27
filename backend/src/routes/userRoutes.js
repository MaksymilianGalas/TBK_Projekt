const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getUserById, getUserStats ,unlockPremium ,getTotalPoints, buyItem  } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    registerUser
);

router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUserById);
router.get('/stats', authMiddleware, getUserStats);
router.post('/premium', authMiddleware, unlockPremium);
router.get('/total-points', authMiddleware, getTotalPoints);
router.post('/buy-item', authMiddleware, buyItem);

module.exports = router;
