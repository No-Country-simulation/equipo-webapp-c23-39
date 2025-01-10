const express = require('express');
const { register, login, getAllAdmins, editAdmin, deleteAdmin } = require('../controllers/authController');
const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.get('/admin', getAllAdmins);

router.put('/:adminId', editAdmin);

router.delete('/:adminId', deleteAdmin)

module.exports = router;