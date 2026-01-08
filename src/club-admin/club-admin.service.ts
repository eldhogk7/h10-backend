import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from '../common/utils/password.util';

@Injectable()
export class ClubAdminService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    const password_hash = await hashPassword(dto.password);
    return this.prisma.clubAdmin.create({
      data: {
        club_id: dto.club_id,
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password_hash,
      },
    });
  }

  async updateByClubId(club_id: string, dto: any) {
    return this.prisma.clubAdmin.updateMany({
      where: { club_id },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
      },
    });
  }
  async updateProfile(admin_id: string, dto: any) {
    return this.prisma.clubAdmin.update({
      where: { admin_id },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        profile_image: dto.profile_image,
      },
    });
  }

  async updateProfileImage(admin_id: string, filename: string) {
    return this.prisma.clubAdmin.update({
      where: { admin_id },
      data: { profile_image: filename },
    });
  }
  findAll() {
    return this.prisma.clubAdmin.findMany();
  }
}
