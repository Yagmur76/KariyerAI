const jwt = require('jsonwebtoken');
const SECRET_KEY = 'gizli_anahtar';

// Giriş yapmış mı kontrolü
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token bulunamadı' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
};

// Sadece STUDENT'a izin ver
const onlyStudent = (req, res, next) => {
  if (req.user.role !== 'STUDENT') {
    return res.status(403).json({ message: 'Sadece öğrenciler erişebilir' });
  }
  next();
};

// Sadece FIRM'a izin ver
const onlyFirm = (req, res, next) => {
  if (req.user.role !== 'FIRM') {
    return res.status(403).json({ message: 'Sadece firmalar erişebilir' });
  }
  next();
};

// Sadece ADMIN'e izin ver
const onlyAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Sadece adminler erişebilir' });
  }
  next();
};

module.exports = { authenticate, onlyStudent, onlyFirm, onlyAdmin };