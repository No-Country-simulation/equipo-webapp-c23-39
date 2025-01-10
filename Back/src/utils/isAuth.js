const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log("Authorization Header:", authorization);

  if (authorization) {
    const token = authorization.split(' ')[1]; // Extraer el token después de 'Bearer '
    console.log("Extracted Token:", token);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decode) => {
      if (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ error: true, message: 'Invalid Token', data: null });
      } else {
        console.log("Decoded Token:", decode);
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).json({ error: true, message: 'No Token', data: null });
  }
};


