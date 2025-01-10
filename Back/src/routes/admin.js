const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Bienvenido al panel de administración' });
});

module.exports = router;