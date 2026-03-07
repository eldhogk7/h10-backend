const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const admins = await prisma.superAdmin.findMany();
        console.log('--- SUPER_ADMINS ---');
        console.log(JSON.stringify(admins, null, 2));

        const clubAdmins = await prisma.clubAdmin.findMany();
        console.log('--- CLUB_ADMINS ---');
        console.log(JSON.stringify(clubAdmins, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
