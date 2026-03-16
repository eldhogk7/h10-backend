const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://h10_user:StrongBackendPass123%21@localhost:5433/postgres?schema=public"
        },
    },
});
async function main() {
    try {
        const clubs = await prisma.club.findMany({ take: 1 });
        console.log("Connection Success with h10_user!");
    } catch (err) {
        console.error("Connection Failed with h10_user:", err.message);
    }
}
main().finally(() => prisma.$disconnect());
