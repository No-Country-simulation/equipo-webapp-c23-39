const express = require('express');
const { chatWithGemini } = require('../controllers/geminiController');
const router = express.Router();

router.post('/chat', chatWithGemini);

module.exports = router;