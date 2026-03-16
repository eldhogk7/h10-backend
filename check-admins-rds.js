const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
        },
    },
});

async function check() {
    const admins = await prisma.superAdmin.findMany();
    console.log('Existing Admins:', JSON.stringify(admins, null, 2));
    await prisma.$disconnect();
}

check();
