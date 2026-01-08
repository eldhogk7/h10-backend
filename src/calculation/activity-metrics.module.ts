import { Module } from '@nestjs/common';
import { ActivityMetricsController } from './activity-metrics.controller';
import { ActivityMetricsService } from './activity-metrics.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ActivityMetricsController],
  providers: [ActivityMetricsService, PrismaService],
})
export class ActivityMetricsModule {}
