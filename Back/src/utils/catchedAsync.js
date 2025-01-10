module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);  // En caso de error, lo pasa al middleware de manejo de errores
    };
  };
  
