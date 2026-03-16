const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://h10_user:StrongBackendPass123%21@database-1.ctso0mogw5dh.ap-south-1.rds.amazonaws.com:5432/tabbdb?schema=public"
        },
    },
});

async function check() {
    try {
        const all = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
        console.log('COUNT:', all.length);
        const clubs = await prisma.club.findMany();
        console.log('CLUBS:', clubs.map(c => c.club_name));

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
