require('dotenv').config();

module.exports = {
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_NAME : process.env.DB_NAME,
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
    DB_DEPLOY: process.env.DB_DEPLOY,
    PORT : process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
    SESSION_SECRET:process.env.SESSION_SECRET,
}  