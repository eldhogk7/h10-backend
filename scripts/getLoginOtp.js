// Prints login OTP and expiry for a given email (used for debugging local/dev only)
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getOtp(email) {
  const now = new Date();
  const sa = await prisma.superAdmin.findUnique({ where: { email }, select: { super_admin_id: true, email: true, login_otp: true, login_otp_expires: true } }).catch(() => null);
  if (sa) {
    console.log(JSON.stringify({ model: 'SuperAdmin', id: sa.super_admin_id, email: sa.email, login_otp: sa.login_otp, login_otp_expires: sa.login_otp_expires }));
    return;
  }

  const ca = await prisma.clubAdmin.findUnique({ where: { email }, select: { admin_id: true, email: true, login_otp: true, login_otp_expires: true } }).catch(() => null);
  if (ca) {
    console.log(JSON.stringify({ model: 'ClubAdmin', id: ca.admin_id, email: ca.email, login_otp: ca.login_otp, login_otp_expires: ca.login_otp_expires }));
    return;
  }

  const coach = await prisma.coach.findUnique({ where: { email }, select: { coach_id: true, email: true, login_otp: true, login_otp_expires: true } }).catch(() => null);
  if (coach) {
    console.log(JSON.stringify({ model: 'Coach', id: coach.coach_id, email: coach.email, login_otp: coach.login_otp, login_otp_expires: coach.login_otp_expires }));
    return;
  }

  console.log('NOT FOUND');
}

(async () => {
  const email = process.argv[2] || 'babuajin120@gmail.com';
  try {
    await getOtp(email);
  } catch (e) {
    console.error('ERROR', e.message || e);
  } finally {
    await prisma.$disconnect();
  }
})();
