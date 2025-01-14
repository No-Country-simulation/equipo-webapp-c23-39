const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const languageMiddleware = require("./middlewares/languaje");
const routes = require("./routes");

const allowedOrigins = ["http://localhost:3001"];

const app = express();

// Seguridad adicional con Helmet
app.use(helmet());

// Middleware para detectar el idioma
app.use(languageMiddleware);

// Parseo de JSON
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Logger condicional según el entorno
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rutas
app.use("/", routes);

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
