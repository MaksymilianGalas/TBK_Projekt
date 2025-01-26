const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getPersonalizations, purchasePersonalization } = require('../controllers/storeController');

const router = express.Router();

router.get('/personalizations', authMiddleware, getPersonalizations);
router.post('/personalizations/purchase', authMiddleware, purchasePersonalization);

module.exports = router;
