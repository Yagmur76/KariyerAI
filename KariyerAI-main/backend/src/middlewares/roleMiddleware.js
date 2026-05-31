const roleMiddleware = (role) => {

  return (req, res, next) => {

    if (req.user.role !== role) {

      return res.status(403).json({
        message: 'Bu işlem için yetkiniz yok'
      });

    }

    next();

  };

};

module.exports = roleMiddleware;