const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
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
        console.log('ALL_TABLES_ON_RDS:', all.map(t => t.table_name).sort());
        console.log('COUNT:', all.length);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
