const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    console.log('Testing connection to localhost:5433...');
    try {
        const start = Date.now();
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        const end = Date.now();
        console.log('Success! Database responded in', end - start, 'ms');
        console.log('Result:', result);
    } catch (err) {
        console.error('Connection failed!');
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
