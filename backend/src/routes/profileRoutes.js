const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

router.get('/:id/profile', authMiddleware, getProfile);
router.put('/:id/profile', authMiddleware, updateProfile);

module.exports = router;
