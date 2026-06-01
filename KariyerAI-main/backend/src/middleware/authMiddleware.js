const authMiddleware = (req, res, next) => {
  console.log("Auth kontrol edildi (şimdilik geçici)");
  next();
};

module.exports = authMiddleware;