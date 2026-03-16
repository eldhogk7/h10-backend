const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
        },
    },
});

async function check() {
    const clubs = await prisma.club.findMany();
    console.log('Existing Clubs:', JSON.stringify(clubs, null, 2));
    await prisma.$disconnect();
}

check();
