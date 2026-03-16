const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:H10StrongPass123%21@localhost:5433/tabbdb"
        },
    },
});

async function run() {
    try {
        console.log('Inserting PodHolder...');
        const phId = 'c7402a77-7108-4c00-902f-985f73420918';

        // UPSERT PodHolder
        await prisma.podHolder.upsert({
            where: { pod_holder_id: phId },
            update: {
                serial_number: 'PH-86F91D03',
                device_id: 'KMNFB',
                club_id: '9b077f64-acb7-4e19-abb3-571a07b238d6',
                wifi_password: 'Filsa1234',
                wifi_ssid: 'FilsaHotspot',
                created_at: new Date('2026-02-13T09:24:28.106+05:30'),
                updated_at: new Date('2026-03-10T07:10:02.681+05:30'),
            },
            create: {
                pod_holder_id: phId,
                serial_number: 'PH-86F91D03',
                device_id: 'KMNFB',
                club_id: '9b077f64-acb7-4e19-abb3-571a07b238d6',
                wifi_password: 'Filsa1234',
                wifi_ssid: 'FilsaHotspot',
                created_at: new Date('2026-02-13T09:24:28.106+05:30'),
                updated_at: new Date('2026-03-10T07:10:02.681+05:30'),
            }
        });

        console.log('Inserting Pods...');
        const podsData = [
            { id: 'cd629e45-7373-4901-9477-104e2f9e63d5', batch: 'BATCH_000009', sn: 'PD-FA20D11B', dev: 'YIE0V', created: '2026-03-04T11:42:47.106+05:30' },
            { id: '0bc2f30f-91e8-48fd-bd01-681d35be0ebd', batch: 'BATCH_000002', sn: 'PD-848FBACA', dev: 'WBLOK', created: '2026-02-13T05:22:39.91+05:30' },
            { id: '10f68dac-1c03-409e-ae51-fe358c8fe2ed', batch: 'BATCH_000002', sn: 'PD-75CC1524', dev: 'DPDIJ', created: '2026-02-13T05:22:39.91+05:30' },
            { id: '36924b42-cfc9-4f12-8487-95b4bec26634', batch: 'BATCH_000002', sn: 'PD-8DDAFF28', dev: 'W8AJ5', created: '2026-02-13T05:22:39.91+05:30' },
            { id: 'a8b16975-ffe9-4d59-bdde-304d3eac5f54', batch: 'BATCH_000002', sn: 'PD-6A460B67', dev: 'E1ROF', created: '2026-02-13T05:22:39.91+05:30' },
            { id: 'e916e217-69e3-40e9-970a-33dc5d6e6378', batch: 'BATCH_000001', sn: 'PD-673C1D70', dev: '0DZBW', created: '2026-02-09T09:07:16.074+05:30' },
            { id: '8b282abc-1d04-4fc9-ad88-fc9ef3784cd0', batch: 'BATCH_000002', sn: 'PD-6D461195', dev: 'MER4V', created: '2026-02-13T05:22:39.91+05:30' },
            { id: 'c2791be7-419f-40df-91a8-cebf8e8ec366', batch: 'BATCH_000002', sn: 'PD-586AFBE9', dev: '3T68R', created: '2026-02-13T05:22:39.91+05:30' },
            { id: '546a22f8-f6e1-4989-8380-1fd8fdd4c6ec', batch: 'BATCH_000002', sn: 'PD-5716A4DF', dev: 'S1S08', created: '2026-02-13T05:22:39.91+05:30' },
            { id: 'bd4e1e34-ab46-4b95-8518-04c2ab8f3aba', batch: 'BATCH_000002', sn: 'PD-5D55FEB3', dev: '2LDXC', created: '2026-02-13T05:22:39.91+05:30' },
            { id: '6c346ef7-ca8b-4896-93c8-48c815a537fb', batch: 'BATCH_000002', sn: 'PD-73D9F713', dev: '4MEXG', created: '2026-02-13T05:22:39.91+05:30' },
            { id: 'bc42c2be-46df-47df-87e1-cf641b99cff0', batch: 'BATCH_000001', sn: 'PD-F90B0FEF', dev: '9DLD1', created: '2026-02-09T09:07:16.074+05:30' },
        ];

        const updatedAt = new Date('2026-03-10T12:06:17.88+05:30');

        for (const pod of podsData) {
            await prisma.pod.upsert({
                where: { pod_id: pod.id },
                update: {
                    batch_id: pod.batch,
                    serial_number: pod.sn,
                    device_id: pod.dev,
                    pod_holder_id: phId,
                    lifecycle_status: 'ACTIVE',
                    created_at: new Date(pod.created),
                    updated_at: updatedAt,
                },
                create: {
                    pod_id: pod.id,
                    batch_id: pod.batch,
                    serial_number: pod.sn,
                    device_id: pod.dev,
                    pod_holder_id: phId,
                    lifecycle_status: 'ACTIVE',
                    created_at: new Date(pod.created),
                    updated_at: updatedAt,
                }
            });
        }

        console.log('Successfully inserted/updated PodHolder and 12 Pods!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

run();
