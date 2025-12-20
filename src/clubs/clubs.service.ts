import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async create(super_admin_id: string, dto: any) {
    const club = await this.prisma.club.create({
      data: {
        super_admin_id,
        club_name: dto.club_name,
        address: dto.address,
        sport: dto.sport,
      },
    });

    const password_hash = await bcrypt.hash(dto.admin_password, 10);

    await this.prisma.clubAdmin.create({
      data: {
        club_id: club.club_id,
        name: dto.admin_name,
        email: dto.admin_email,
        password_hash,
      },
    });

    return {
      message: 'Club & Admin created successfully',
      club,
    };
  }
  async delete(club_id: string) {
    // delete admin first (FK safety)
    await this.prisma.clubAdmin.deleteMany({
      where: { club_id },
    });

    // delete club
    return this.prisma.club.delete({
      where: { club_id },
    });
  }

  async update(club_id: string, dto: any) {
    return this.prisma.club.update({
      where: { club_id },
      data: {
        club_name: dto.club_name,
        address: dto.address,
        sport: dto.sport,
        pod_holder_id: dto.pod_holder_id ?? null,
      },
    });
  }

  async findAll() {
    const clubs = await this.prisma.club.findMany({
      include: { club_admins: true },
    });

    return clubs.map(club => ({
      club_id: club.club_id,
      club_name: club.club_name,
      address: club.address,
      sport: club.sport,

      admin: club.club_admins.length > 0
        ? {
            admin_id: club.club_admins[0].admin_id,
            name: club.club_admins[0].name,
            email: club.club_admins[0].email,
            phone: club.club_admins[0].phone,
          }
        : null,
    }));
  }
  findOne(id: string) {
    return this.prisma.club.findUnique({
      where: { club_id: id },
      include: { club_admins: true },
    });
  }
}
