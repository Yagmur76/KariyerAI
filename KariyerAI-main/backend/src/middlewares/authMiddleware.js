const jwt = require('jsonwebtoken');

const SECRET_KEY = 'gizli_anahtar';

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token gerekli'
    });
  }

  try {

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message: 'Geçersiz token'
    });

  }

};

module.exports = authMiddleware;