const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (roles = []) => {
 
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Acceso denegado, se requiere token' });
    }

    try {
      
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no encontrado' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
      req.user = decoded;

      
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Permiso denegado, rol no autorizado' });
      }

      next();
    } catch (error) {
      return res.status(400).json({ message: 'Token inválido' });
    }
  };
};

module.exports = authMiddleware;
