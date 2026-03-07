import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.superAdmin.findFirst().then(sa => console.log("SuperAdmin:", sa)).finally(() => p.$disconnect());
