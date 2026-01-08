import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityMetricsService {
  constructor(private prisma: PrismaService) {}

  async createMetric(sessionId: string, playerId: number, m: any,) {
    return this.prisma.activityMetric.upsert({
      where: {
        session_id_player_id: {
          session_id: sessionId,
          player_id: playerId,
        },
      },
      update: {
        total_distance: m.total_distance,
        hsr_distance: m.hsr_distance,
        sprint_distance: m.sprint_distance,
        top_speed: m.top_speed,
        sprint_count: m.sprint_count,

        acceleration: m.accelerations,
        deceleration: m.decelerations,
        max_acceleration: m.max_acceleration,
        max_deceleration: m.max_deceleration,

        player_load: m.player_load,
        power_score: m.power_score,

        hr_max: m.hr_max,
        time_in_red_zone: m.time_in_red_zone,
        percent_in_red_zone: m.percent_in_red_zone,
        hr_recovery_time: m.hr_recovery_time,

        recorded_at: new Date(
          m.created_at ? Number(m.created_at) * 1000 : Date.now(),
        ),
      },
      create: {
        session_id: sessionId,
        player_id: playerId,

        total_distance: m.total_distance,
        hsr_distance: m.hsr_distance,
        sprint_distance: m.sprint_distance,
        top_speed: m.top_speed,
        sprint_count: m.sprint_count,

        acceleration: m.accelerations,
        deceleration: m.decelerations,
        max_acceleration: m.max_acceleration,
        max_deceleration: m.max_deceleration,

        player_load: m.player_load,
        power_score: m.power_score,

        hr_max: m.hr_max,
        time_in_red_zone: m.time_in_red_zone,
        percent_in_red_zone: m.percent_in_red_zone,
        hr_recovery_time: m.hr_recovery_time,

        recorded_at: new Date(
          m.created_at ? Number(m.created_at) * 1000 : Date.now(),
        ),
      },
    });
  }
  async getAllMetrics() {
    return this.prisma.activityMetric.findMany({
      orderBy: { recorded_at: 'asc' },
    });
  }
}
