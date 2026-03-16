const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
        },
    },
});

async function get() {
    try {
        const user = await prisma.superAdmin.findUnique({
            where: { email: 'jibinabhram@gmail.com' }
        });
        console.log('ACTIVE_OTP:', user.login_otp);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

get();
