const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.$queryRaw`
    SELECT column_name, column_default, is_nullable 
    FROM information_schema.columns 
    WHERE table_name = 'exercise_types' AND column_name = 'exrId'
  `;
    console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
