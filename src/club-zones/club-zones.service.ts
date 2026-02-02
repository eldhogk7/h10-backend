import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClubZonesService {
  constructor(private prisma: PrismaService) {}

  async getClubZoneDefaults(clubAdminId: string, clubId: string) {
    // Validate club admin
    const admin = await this.prisma.clubAdmin.findFirst({
      where: { admin_id: clubAdminId, club_id: clubId },
    });
    if (!admin) throw new BadRequestException('Invalid club admin');

    return this.prisma.clubHrZoneDefault.findMany({
      where: { club_id: clubId },
      orderBy: { zone_number: 'asc' },
    });
  }

  async setClubZoneDefaults(clubAdminId: string, clubId: string, zones: any[]) {
    // Validate club admin
    const admin = await this.prisma.clubAdmin.findFirst({
      where: { admin_id: clubAdminId, club_id: clubId },
    });
    if (!admin) throw new BadRequestException('Invalid club admin');

    return this.prisma.$transaction(async tx => {
      // Delete existing defaults
      await tx.clubHrZoneDefault.deleteMany({ where: { club_id: clubId } });

      // Create new defaults
      for (const zone of zones) {
        await tx.clubHrZoneDefault.create({
          data: {
            club_id: clubId,
            zone_number: zone.zone || zone.zone_number,
            min_hr: zone.min || zone.min_hr,
            max_hr: zone.max || zone.max_hr,
          },
        });
      }

      // Return all zones
      return tx.clubHrZoneDefault.findMany({
        where: { club_id: clubId },
        orderBy: { zone_number: 'asc' },
      });
    });
  }
}
