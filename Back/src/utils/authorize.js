const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: true, message: "Access denied" });
    }
    next();
  };
};

module.exports = authorize;
