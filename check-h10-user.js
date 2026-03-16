const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://h10_user:StrongBackendPass123%21@localhost:5433/tabbdb"
        },
    },
});

async function check() {
    try {
        const res = await prisma.$queryRaw`SELECT current_user`;
        console.log('USER_CHECK:', res);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
