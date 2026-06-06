/**
 * Ilk admin kullanicisini olusturur.
 * Kullanim: node scripts/seedAdmin.js
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const prisma = require('../src/utils/prisma');

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@kariyerai.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123456';
  const name = 'Admin';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin zaten var:', email);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
      status: 'APPROVED',
    },
  });

  console.log('Admin olusturuldu:');
  console.log('  email:', admin.email);
  console.log('  sifre:', password);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
