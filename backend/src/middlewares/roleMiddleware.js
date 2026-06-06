const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Yetkilendirme gerekli' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Bu islem icin yetkiniz yok',
        requiredRoles: allowedRoles,
        yourRole: req.user.role,
      });
    }

    next();
  };
};

const requireStudent = requireRole('STUDENT');
const requireFirm = requireRole('FIRM');
const requireAdmin = requireRole('ADMIN');

module.exports = {
  requireRole,
  requireStudent,
  requireFirm,
  requireAdmin,
};
