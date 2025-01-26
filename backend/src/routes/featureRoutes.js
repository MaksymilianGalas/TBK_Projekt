const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { unlockFeature } = require('../controllers/featureController');

const router = express.Router();

router.post('/unlock', authMiddleware, unlockFeature);

module.exports = router;
