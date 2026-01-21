import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async createPlayer(
    clubAdminId: string,
    clubId: string,
    dto: CreatePlayerDto,
  ) {
    return this.prisma.$transaction(async tx => {

      // ✅ 0️⃣ Validate club admin
      const admin = await tx.clubAdmin.findFirst({
        where: {
          admin_id: clubAdminId,
          club_id: clubId,
        },
      });

      if (!admin) {
        throw new BadRequestException('Invalid club admin');
      }

      // 1️⃣ Create player
      let player;

      try {
        // 1️⃣ Create player
        player = await tx.player.create({
          data: {
            club_id: clubId,
            player_name: dto.player_name,
            age: dto.age,
            jersey_number: dto.jersey_number,
            position: dto.position,
            phone: dto.phone,
          },
        });
      } catch (e: any) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2002'
        ) {
          throw new BadRequestException(
            'Jersey number already exists in this club',
          );
        }
        throw e;
      }

      // 3️⃣ Assign pod (optional)
      if (dto.pod_id) {

        // 🔒 1. Check if pod is already assigned
        const existingAssignment = await tx.playerPod.findFirst({
          where: { pod_id: dto.pod_id },
        });

        if (existingAssignment) {
          throw new BadRequestException(
            'This pod is already assigned to another player',
          );
        }

        // 🔍 2. Validate pod belongs to club
        const pod = await tx.pod.findFirst({
          where: {
            pod_id: dto.pod_id,
          },
          include: {
            pod_holder: true,
          },
        });

        if (!pod || !pod.pod_holder) {
          throw new BadRequestException('Invalid pod');
        }

        if (pod.pod_holder.club_id !== clubId) {
          throw new BadRequestException(
            'Pod does not belong to your club',
          );
        }

        // 🔗 3. Assign pod to player
        await tx.playerPod.create({
          data: {
            player_id: player.player_id,
            pod_id: dto.pod_id,
          },
        });
      }
      return player;
    });
  }

  async findPlayersByClub(clubId: string) {
    return this.prisma.player.findMany({
      where: { club_id: clubId },
      include: {
        club: true, // ✅ REQUIRED for club name

        player_pods: {
          include: {
            pod: {
              include: {
                pod_holder: true, // ✅ REQUIRED for pod holder
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
