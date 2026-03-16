const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
        },
    },
});

async function fix() {
    try {
        console.log('Granting privileges...');
        await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO h10_user`);
        await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO h10_user`);
        await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO h10_user`);
        await prisma.$executeRawUnsafe(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO h10_user`);
        console.log('Permissions fixed!');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

fix();
