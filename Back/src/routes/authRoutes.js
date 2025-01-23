const express = require('express');
const passport = require('passport');
const { register, login, getAllAdmins, editAdmin, deleteAdmin } = require('../controllers/userController.js');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/admin', getAllAdmins);

router.put('/:adminId', editAdmin);

router.delete('/:adminId', deleteAdmin);

// Rutas de autenticación con Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('http://localhost:3000'); // Redirigir al frontend después de la autenticación
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});

module.exports = router;