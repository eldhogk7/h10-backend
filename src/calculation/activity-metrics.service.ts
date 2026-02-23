import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityMetricsService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * sessionId → string
   * playerId  → UUID (string)
   */
  async createMetric(
    sessionId: string,
    playerId: string, // ✅ FIXED: string (UUID)
    m: any,
  ) {
    // Unix timestamp normalization (seconds to milliseconds if needed)
    let ts = m.recordedAt || m.recorded_at || Date.now();
    if (typeof ts === 'number' && ts < 2000000000) ts *= 1000;

    // Safety check for NaN
    const numTs = Number(ts);
    const recordedAt = isNaN(numTs) ? new Date() : new Date(numTs);

    const exrId = m.exrId || m.exr_id || null;

    try {
      // Prisma upsert does NOT support 'null' values in compound unique keys.
      // We must manually check for existence when exrId can be null.
      const existing = await this.prisma.activityMetric.findFirst({
        where: { sessionId, playerId, exrId } as any,
      });

      const data = {
        deviceId: m.deviceId,
        exrId,
        totalDistance: m.totalDistance,
        hsrDistance: m.hsrDistance,
        sprintDistance: m.sprintDistance,
        topSpeed: m.topSpeed,
        sprintCount: m.sprintCount,
        acceleration: m.acceleration,
        deceleration: m.deceleration,
        maxAcceleration: m.maxAcceleration,
        maxDeceleration: m.maxDeceleration,
        playerLoad: m.playerLoad,
        powerScore: m.powerScore,
        hrMax: m.hrMax,
        timeInRedZone: m.timeInRedZone,
        percentInRedZone: m.percentInRedZone,
        hrRecoveryTime: m.hrRecoveryTime,
        recordedAt,
      };

      if (existing) {
        return this.prisma.activityMetric.update({
          where: { id: existing.id },
          data,
        });
      } else {
        return this.prisma.activityMetric.create({
          data: {
            ...data,
            sessionId,
            playerId,
          },
        });
      }
    } catch (err: any) {
      console.error('❌ [ActivityMetricsService] Error syncing metric:', err);

      if (err?.code === 'P2003') {
        const field = err?.meta?.field_name || '';
        if (field.includes('session_id')) {
          throw new ConflictException('Event not synced yet for this session_id');
        }
        if (field.includes('player_id')) {
          throw new ConflictException(`Player not found in backend: ${playerId}`);
        }
        throw new ConflictException(`Relation missing: ${field}`);
      }
      throw err;
    }
  }

  async getAllMetrics() {
    return this.prisma.activityMetric.findMany({
      orderBy: { recordedAt: 'asc' },
    });
  }
}
