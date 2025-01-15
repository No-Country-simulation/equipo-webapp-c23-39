const express = require('express');
const { register, login, profile } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.get('/profile', authMiddleware(), profile);  // Cualquier usuario puede acceder a su perfil


router.post('/admin', authMiddleware('admin'), (req, res) => {
  res.json({ message: "Acceso permitido para administradores" });
});


router.get('/dashboard', authMiddleware(['admin', 'user']), (req, res) => {
  res.json({ message: `Acceso permitido para ${req.user.role}` });
});

module.exports = router;
