import { PrismaService } from '../prisma/prisma.service';
export declare class ClubsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(super_admin_id: string, dto: any): Promise<{
        message: string;
        club: {
            super_admin_id: string | null;
            created_at: Date;
            updated_at: Date;
            club_id: string;
            club_name: string | null;
            address: string | null;
            status: string | null;
            sport: string | null;
            pod_holder_id: string | null;
        };
    }>;
    delete(club_id: string): Promise<{
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        status: string | null;
        sport: string | null;
        pod_holder_id: string | null;
    }>;
    update(club_id: string, dto: any): Promise<{
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        status: string | null;
        sport: string | null;
        pod_holder_id: string | null;
    }>;
    findAll(): Promise<{
        club_id: string;
        club_name: string | null;
        address: string | null;
        sport: string | null;
        admin: {
            admin_id: string;
            name: string | null;
            email: string | null;
            phone: string | null;
        } | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ClubClient<({
        club_admins: {
            email: string | null;
            name: string | null;
            phone: string | null;
            password_hash: string | null;
            profile_image: string | null;
            created_at: Date;
            updated_at: Date;
            reset_token: string | null;
            reset_token_expires: Date | null;
            login_otp: string | null;
            login_otp_expires: Date | null;
            admin_id: string;
            club_id: string;
        }[];
    } & {
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        status: string | null;
        sport: string | null;
        pod_holder_id: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
