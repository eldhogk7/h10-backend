const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function apply() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
            },
        },
    });

    try {
        const sql = fs.readFileSync('cleaned_structure.sql', 'utf8');
        const commands = sql.split(';').filter(cmd => cmd.trim());

        console.log(`Applying ${commands.length} commands...`);

        for (const cmd of commands) {
            try {
                await prisma.$executeRawUnsafe(cmd);
            } catch (e) {
                // Ignore errors for individual commands if they already exist
                // console.log('Notice:', e.message.substring(0, 50));
            }
        }
        console.log('Finished applying structure.');

        // Also re-apply the function and set the default properly
        console.log('Re-applying function and defaults...');
        await prisma.$executeRawUnsafe(`
        CREATE OR REPLACE FUNCTION public.generate_exr_id()
        RETURNS CHAR(5) AS $$
        DECLARE
            chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            result TEXT := '';
        BEGIN
            FOR i IN 1..5 LOOP
                result := result || substr(chars, floor(random()*36 + 1)::int, 1);
            END LOOP;
            RETURN result;
        END;
        $$ LANGUAGE plpgsql;
    `);

        await prisma.$executeRawUnsafe('ALTER TABLE exercise_types ALTER COLUMN "exrId" SET DEFAULT generate_exr_id()');
        console.log('All set!');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

apply();
