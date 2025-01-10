const languageMiddleware = (req, res, next) => {
    const preferredLanguage = req.headers["accept-language"]?.split(",")[0]?.substring(0, 2) || "en";
    req.preferredLanguage = ["en", "es", "fr"].includes(preferredLanguage) ? preferredLanguage : "en";
    next();
  };
  
  module.exports = languageMiddleware;