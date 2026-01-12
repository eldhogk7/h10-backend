import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityMetricsService {
  constructor(private prisma: PrismaService) {}

  async createMetric(sessionId: string, playerId: number, m: any) {
    return this.prisma.activityMetric.upsert({
      where: {
        sessionId_playerId: {  // <-- camelCase for compound unique key
          sessionId: sessionId,
          playerId: playerId,
        },
      },
      update: {
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

        recordedAt: new Date(
          m.createdAt ? Number(m.createdAt) * 1000 : Date.now(),
        ),
      },
      create: {
        sessionId: sessionId,
        playerId: playerId,

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

        recordedAt: new Date(
          m.createdAt ? Number(m.createdAt) * 1000 : Date.now(),
        ),
      },
    });
  }

  async getAllMetrics() {
    return this.prisma.activityMetric.findMany({
      orderBy: { recordedAt: 'asc' }, // <-- camelCase
    });
  }
}
