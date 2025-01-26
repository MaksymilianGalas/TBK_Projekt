const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getChallenges, completeChallenge } = require('../controllers/challengeController');

const router = express.Router();

router.get('/', authMiddleware, getChallenges);
router.post('/complete', authMiddleware, completeChallenge);

module.exports = router;
