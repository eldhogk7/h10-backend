const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const phs = await prisma.podHolder.findMany({
        include: { pods: true },
        orderBy: { created_at: 'desc' }
    });
    console.log("Top 5 PodHolders:", JSON.stringify(phs.slice(0, 5), null, 2));
}
main().catch(console.error).finally(()=> prisma.$disconnect());
