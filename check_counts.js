const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const exCount = await prisma.exercise.count();
    const typeCount = await prisma.exerciseType.count();
    console.log(`Exercises: ${exCount}`);
    console.log(`ExerciseTypes: ${typeCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
