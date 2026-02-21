import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) { }

  create(dto: any) {
    const ground_name = dto.ground_name ?? dto.field ?? null;
    return this.prisma.event.create({
      data: {
        club_id: dto.club_id,
        event_name: dto.event_name,
        event_date: dto.event_date ? new Date(dto.event_date) : undefined,
        location: dto.location,
        ground_name,
        notes: dto.notes ?? null,
        event_type: dto.event_type,
      },
    });
  }

  async sync(dto: any) {
    const {
      event_id,
      club_id,
      event_name,
      event_type,
      event_date,
      location,
      field,
      ground_name: groundNameInput,
      notes,
      file_start_ts,
      file_end_ts,
      trim_start_ts,
      trim_end_ts,
      recorded_at,
      exercises
    } = dto;

    const ground_name = groundNameInput ?? field ?? null;
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Upsert based on session_id (from mobile)
        const event = await tx.event.upsert({
          where: {
            sessionId: event_id,
          },
          update: {
            event_name,
            event_type: event_type || 'training',
            event_date: event_date ? new Date(event_date) : null,
            location,
            ground_name,
            notes: notes ?? null,
            file_start_ts: file_start_ts ? BigInt(Math.floor(Number(file_start_ts))) : null,
            file_end_ts: file_end_ts ? BigInt(Math.floor(Number(file_end_ts))) : null,
            trim_start_ts: trim_start_ts ? BigInt(Math.floor(Number(trim_start_ts))) : null,
            trim_end_ts: trim_end_ts ? BigInt(Math.floor(Number(trim_end_ts))) : null,
          },
          create: {
            sessionId: event_id,
            club_id,
            event_name,
            event_type: event_type || 'training',
            event_date: event_date ? new Date(event_date) : null,
            location,
            ground_name,
            notes: notes ?? null,
            file_start_ts: file_start_ts ? BigInt(Math.floor(Number(file_start_ts))) : null,
            file_end_ts: file_end_ts ? BigInt(Math.floor(Number(file_end_ts))) : null,
            trim_start_ts: trim_start_ts ? BigInt(Math.floor(Number(trim_start_ts))) : null,
            trim_end_ts: trim_end_ts ? BigInt(Math.floor(Number(trim_end_ts))) : null,
          },
        });

        // Handle Exercises sync
        if (exercises && Array.isArray(exercises)) {
          // Clear existing exercises for this event to avoid duplicates/orphans during re-sync
          await tx.exercise.deleteMany({
            where: { event_id: event.event_id }
          });

          for (const ex of exercises) {
            // 🔹 Find the exrId for this exercise name
            const exType = await tx.exerciseType.findFirst({
              where: {
                club_id: event.club_id,
                name: ex.type,
              },
              select: { exrId: true },
            });

            if (!exType) {
              console.warn(`⚠️ [EventsService] No ExerciseType found for name: ${ex.type} in club: ${event.club_id}`);
              continue; // Or handle error
            }

            const newEx = await tx.exercise.create({
              data: {
                event_id: event.event_id,
                sessionId: event.sessionId,
                exrId: exType.exrId,
                start_ts: BigInt(Math.floor(Number(ex.start))),
                end_ts: BigInt(Math.floor(Number(ex.end))),
                color: ex.color,
              }
            });

            if (ex.players && Array.isArray(ex.players)) {
              // Note: player_id must be a valid UUID in the DB
              await tx.exercisePlayer.createMany({
                data: ex.players.map((pId: string) => ({
                  exercise_id: newEx.exercise_id,
                  player_id: pId
                }))
              });
            }
          }
        }

        // Handle Participants sync
        if (dto.participants && Array.isArray(dto.participants)) {
          await tx.eventParticipant.deleteMany({
            where: { event_id: event.event_id }
          });
          await tx.eventParticipant.createMany({
            data: dto.participants.map((pId: string) => ({
              event_id: event.event_id,
              player_id: pId
            }))
          });
        }

        return event;
      });
    } catch (err: any) {
      console.error('❌ [EventsService] Error syncing event:', err);
      throw err;
    }
  }

  async updateBySessionId(sessionId: string, dto: any) {
    const ground_name = dto.ground_name ?? dto.field ?? null;
    const data = {
      event_name: dto.event_name,
      event_type: dto.event_type || 'training',
      event_date: dto.event_date ? new Date(dto.event_date) : null,
      location: dto.location,
      ground_name,
      notes: dto.notes ?? null,
    };

    const bySession = await this.prisma.event.findUnique({
      where: { sessionId },
      select: { event_id: true },
    });

    if (bySession?.event_id) {
      return this.prisma.event.update({
        where: { event_id: bySession.event_id },
        data,
      });
    }

    // Fallback: treat sessionId as event_id
    return this.prisma.event.update({
      where: { event_id: sessionId },
      data,
    });
  }

  async deleteBySessionId(sessionId: string) {
    const bySession = await this.prisma.event.findUnique({
      where: { sessionId },
      select: { event_id: true },
    });

    if (bySession?.event_id) {
      return this.prisma.event.delete({
        where: { event_id: bySession.event_id },
      });
    }

    // Fallback: treat sessionId as event_id
    return this.prisma.event.delete({
      where: { event_id: sessionId },
    });
  }

  findAll() {
    return this.prisma.event.findMany({
      include: {
        event_participants: {
          include: {
            player: {
              select: {
                player_id: true,
                player_name: true,
              },
            },
          },
        },
        exercises: {
          select: {
            exrId: true,
            exerciseType: {
              select: {
                name: true,
              }
            }
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  findBySessionId(sessionId: string) {
    return this.prisma.event.findUnique({
      where: { sessionId },
      include: {
        event_participants: {
          include: {
            player: true,
          },
        },
      },
    });
  }
}
