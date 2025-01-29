const express = require('express');
const passport = require('passport');
const { register, login, getAllAdmins, editAdmin, deleteAdmin } = require('../controllers/userController.js');
const router = express.Router();


router.post('/register', register);

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
  });

  router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:3000'); // preguntar si esta es la url correcta
  });
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/admin', getAllAdmins);

router.put('/:adminId', editAdmin);

router.delete('/:adminId', deleteAdmin)

module.exports = router;