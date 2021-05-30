const express = require('express');

const gameControllers = require('../controllers/gameControllers');

const router = express.Router();

router.post('/start', gameControllers.startNewGame);
router.post('/resume', gameControllers.resumeGame);
router.post('/check-answer', gameControllers.checkAnswer);

module.exports = router;