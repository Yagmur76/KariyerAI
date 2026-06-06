const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma');
const { signToken } = require('../utils/jwt');
const sanitizeUser = require('../utils/sanitizeUser');

const resetTokens = new Map();

function validateEmail(email) {
  return typeof email === 'string' && email.includes('@') && email.length >= 5;
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

async function createUser({ email, password, name, role, companyName }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error('Bu email zaten kayitli');
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const isFirm = role === 'FIRM';

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      companyName: isFirm ? companyName || name : null,
      status: isFirm ? 'PENDING' : 'APPROVED',
    },
  });

  return sanitizeUser(user);
}

exports.registerStudent = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'email, password ve name zorunludur' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Gecerli bir email girin' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Sifre en az 6 karakter olmali' });
    }

    const user = await createUser({
      email,
      password,
      name,
      role: 'STUDENT',
    });

    res.status(201).json({
      message: 'Ogrenci kaydi basarili',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Kayit basarisiz' });
  }
};

exports.registerFirm = async (req, res) => {
  try {
    const { email, password, name, companyName } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'email, password ve name zorunludur' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Gecerli bir email girin' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Sifre en az 6 karakter olmali' });
    }

    const user = await createUser({
      email,
      password,
      name,
      role: 'FIRM',
      companyName,
    });

    res.status(201).json({
      message: 'Firma kaydi alindi. Admin onayindan sonra giris yapabilirsiniz.',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Kayit basarisiz' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'email, password ve name zorunludur' });
    }

    const normalizedRole = (role || 'STUDENT').toUpperCase();
    if (!['STUDENT', 'FIRM'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'role STUDENT veya FIRM olmali' });
    }

    if (normalizedRole === 'FIRM') {
      return exports.registerFirm(req, res);
    }
    return exports.registerStudent(req, res);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Kayit basarisiz' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email ve password zorunludur' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Kullanici bulunamadi' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sifre yanlis' });
    }

    if (user.status === 'PENDING') {
      return res.status(403).json({
        message: 'Hesabiniz admin onayi bekliyor',
      });
    }

    if (user.status === 'REJECTED') {
      return res.status(403).json({
        message: 'Hesabiniz reddedildi',
      });
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
      email: user.email,
    });

    res.json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Giris basarisiz' });
  }
};

exports.logout = async (req, res) => {
  res.json({ message: 'Cikis yapildi. Token istemci tarafinda silinmelidir.' });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'email zorunludur' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({
        message: 'Eger email kayitliysa sifre sifirlama baglantisi gonderildi',
      });
    }

    const token = `reset_${user.id}_${Date.now()}`;
    resetTokens.set(token, {
      userId: user.id,
      expiresAt: Date.now() + 1000 * 60 * 30,
    });

    res.json({
      message: 'Sifre sifirlama tokeni olusturuldu (gelistirme ortami)',
      resetToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Islem basarisiz' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'token ve newPassword zorunludur' });
    }
    if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: 'Sifre en az 6 karakter olmali' });
    }

    const record = resetTokens.get(token);
    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Gecersiz veya suresi dolmus token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: record.userId },
      data: { password: hashedPassword },
    });

    resetTokens.delete(token);

    res.json({ message: 'Sifre basariyla guncellendi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sifre guncellenemedi' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'Kullanici bulunamadi' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Profil alinamadi' });
  }
};
