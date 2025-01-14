const express = require('express');
const { saveChat, getChats, deleteChat } = require('../controllers/chatController');
const router = express.Router();

router.post('/save', saveChat);
router.get('/:userId', getChats);
router.delete('/:chatId', deleteChat);

module.exports = router;