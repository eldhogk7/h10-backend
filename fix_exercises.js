const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const firstType = await prisma.exerciseType.findFirst();
    if (!firstType) {
        console.log("No ExerciseType found.");
        return;
    }
    const result = await prisma.exercise.updateMany({
        data: {
            exrId: firstType.exrId
        }
    });
    console.log(`Updated ${result.count} exercises with exrId: ${firstType.exrId}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
