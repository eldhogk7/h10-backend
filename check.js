const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const phs = await prisma.podHolder.findMany({
        include: { pods: true }
    });
    console.log("Total PodHolders:", phs.length);
    const withPods = phs.filter(p => p.pods && p.pods.length > 0);
    console.log("PodHolders with Pods:", withPods.length);
    if (withPods.length > 0) {
        console.log("Sample:", withPods[0].pods.length, "pods assigned to", withPods[0].serial_number);
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
