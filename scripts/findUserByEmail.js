// Safe lookup script — prints which model contains the email (if any) without exposing password_hash
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findByEmail(email) {
  const sa = await prisma.superAdmin.findUnique({ where: { email }, select: { super_admin_id: true, email: true, password_hash: true } }).catch(() => null);
  if (sa) {
    console.log(JSON.stringify({ model: 'SuperAdmin', id: sa.super_admin_id, email: sa.email, hasPassword: !!sa.password_hash }));
    return;
  }

  const ca = await prisma.clubAdmin.findUnique({ where: { email }, select: { admin_id: true, email: true, password_hash: true } }).catch(() => null);
  if (ca) {
    console.log(JSON.stringify({ model: 'ClubAdmin', id: ca.admin_id, email: ca.email, hasPassword: !!ca.password_hash }));
    return;
  }

  const coach = await prisma.coach.findUnique({ where: { email }, select: { coach_id: true, email: true, password_hash: true } }).catch(() => null);
  if (coach) {
    console.log(JSON.stringify({ model: 'Coach', id: coach.coach_id, email: coach.email, hasPassword: !!coach.password_hash }));
    return;
  }

  console.log('NOT FOUND');
}

(async () => {
  const email = process.argv[2] || 'babuajin120@gmail.com';
  try {
    await findByEmail(email);
  } catch (e) {
    console.error('ERROR', e.message || e);
  } finally {
    await prisma.$disconnect();
  }
})();
