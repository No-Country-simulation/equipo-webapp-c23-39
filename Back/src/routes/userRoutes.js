const express = require('express');
const { register, login, profile } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta de registro de usuario (sin autenticación, cualquier usuario puede acceder)
router.post('/register', register);

// Ruta de inicio de sesión de usuario (sin autenticación, cualquier usuario puede acceder)
router.post('/login', login);

// Ruta para obtener el perfil del usuario, solo accesible si el usuario está autenticado
router.get('/profile', authMiddleware(), profile);  // Cualquier usuario puede acceder a su perfil

// Ruta solo para administradores, solo pueden acceder los usuarios con rol 'admin'
router.post('/admin', authMiddleware('admin'), (req, res) => {
  res.json({ message: "Acceso permitido para administradores" });
});

// Ruta para obtener el dashboard, accesible por usuarios con rol 'user' o 'admin'
router.get('/dashboard', authMiddleware(['admin', 'user']), (req, res) => {
  res.json({ message: `Acceso permitido para ${req.user.role}` });
});

module.exports = router;
