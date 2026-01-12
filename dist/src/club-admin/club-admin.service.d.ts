import { PrismaService } from '../prisma/prisma.service';
export declare class ClubAdminService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
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
        temp_password: string | null;
    }>;
    updateByClubId(club_id: string, dto: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    updateProfile(admin_id: string, dto: any): Promise<{
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
        temp_password: string | null;
    }>;
    updateProfileImage(admin_id: string, filename: string): Promise<{
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
        temp_password: string | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string | null;
        name: string | null;
        phone: string | null;
        profile_image: string | null;
        created_at: Date;
        admin_id: string;
        club_id: string;
        temp_password: string | null;
    }[]>;
}
