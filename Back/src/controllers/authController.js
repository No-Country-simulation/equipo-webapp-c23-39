const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Admin} = require('../data');  // Modelo de administrador
require('dotenv').config();  // Para usar las variables de entorno

// Registrar un administrador
exports.register = async (req, res) => {
    const { username, password } = req.body;
  
    // Agregar logs para debug
    console.log('Datos recibidos:', { username, password });
  
    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Contraseña hasheada:', hashedPassword);
  
      // Crear el nuevo administrador en la base de datos
      const newAdmin = await Admin.create({ username, password: hashedPassword });
      console.log('Admin creado:', newAdmin);
  
      res.status(201).json({ message: 'Admin registrado con éxito', admin: newAdmin });
    } catch (error) {
      console.error('Error en el registro:', error);  // Log del error en la consola
      res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
  };

// Iniciar sesión (login)
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token , admin});
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión', error });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    // Obtener todos los administradores
    const admins = await Admin.findAll();
    
    // Verificar si hay administradores
    if (admins.length === 0) {
      return res.status(404).json({ message: 'No se encontraron administradores' });
    }

    // Devolver los administradores encontrados
    res.status(200).json({ admins });
  } catch (error) {
    console.error('Error al obtener administradores:', error);
    res.status(500).json({ message: 'Error al obtener administradores', error: error.message });
  }
};

// Editar administrador
exports.editAdmin = async (req, res) => {
  const { adminId } = req.params;  // ID del administrador a editar
  const { username, password } = req.body;  // Nuevos datos del admin

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    // Si se proporciona una nueva contraseña, la hasheamos
    let updatedPassword = admin.password;  // Mantener la contraseña actual por defecto
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);  // Hashear la nueva contraseña
    }

    // Actualizamos el administrador
    const updatedAdmin = await admin.update({
      username: username || admin.username,  // Solo actualizamos el username si se proporciona uno nuevo
      password: updatedPassword,  // Actualizamos la contraseña si es necesario
    });

    res.status(200).json({ message: 'Administrador actualizado con éxito', admin: updatedAdmin });
  } catch (error) {
    console.error('Error al editar administrador:', error);
    res.status(500).json({ message: 'Error al editar administrador', error: error.message });
  }
};

// Eliminar administrador
exports.deleteAdmin = async (req, res) => {
  const { adminId } = req.params;  // ID del administrador a eliminar

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    // Eliminamos el administrador
    await admin.destroy();
    res.status(200).json({ message: 'Administrador eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar administrador:', error);
    res.status(500).json({ message: 'Error al eliminar administrador', error: error.message });
  }
};

