const { User } = require('../data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registro de usuario
exports.register = async (req, res) => {
  const { email, password, name, language = 'en' } = req.body;

  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const newUser = await User.create({ email, password, name, language });
    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
};

// Iniciar sesión de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
  }
};

// Obtener el perfil de usuario
exports.profile = async (req, res) => {
  const { user } = req;

  try {
    const userProfile = await User.findByPk(user.id);
    if (!userProfile) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: `Bienvenido, ${userProfile.name}`, user: userProfile });
  } catch (error) {
    console.error('Error obteniendo el perfil:', error);
    return res.status(500).json({ message: 'Error obteniendo el perfil', error: error.message });
  }
};
