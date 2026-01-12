import { ClubAdminService } from './club-admin.service';
import { CreateClubAdminDto } from './dto/create-club-admin.dto';
import { UpdateClubAdminDto } from './dto/update-club-admin.dto';
export declare class ClubAdminController {
    private readonly svc;
    constructor(svc: ClubAdminService);
    create(dto: CreateClubAdminDto): Promise<{
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
    updateByClub(clubId: string, dto: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    updateProfile(id: string, dto: UpdateClubAdminDto): Promise<{
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
    uploadImage(id: string, file: Express.Multer.File): Promise<{
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
}
