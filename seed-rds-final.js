const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
        },
    },
});

async function seed() {
    const email = 'jibinabhram@gmail.com';
    const password = 'StrongPassword123!';

    try {
        const hash = await bcrypt.hash(password, 10);

        console.log('Upserting SuperAdmin...');
        await prisma.superAdmin.upsert({
            where: { email },
            update: { password_hash: hash },
            create: {
                name: 'Jibin',
                email: email,
                password_hash: hash,
            }
        });

        console.log('Seed successful!');
        console.log('Email:', email);
        console.log('Password: StrongPassword123!');
    } catch (err) {
        console.error('Seed failed:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
