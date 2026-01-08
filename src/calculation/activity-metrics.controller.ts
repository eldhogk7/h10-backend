import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ActivityMetricsService } from './activity-metrics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('activity-metrics')
export class ActivityMetricsController {
  constructor(
    private readonly service: ActivityMetricsService,
  ) {}

  @Post('sync')
  @UseGuards(JwtAuthGuard)
  async syncMetrics(
    @Body() body: any,
    @Req() req: any,
  ) {
    const { session_id, player_id, metrics } = body;

    if (!session_id || !player_id || !metrics) {
      throw new Error('Invalid sync payload');
    }

    return this.service.createMetric(
      session_id,
      Number(player_id),
      metrics
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMetrics(@Req() req: any) {
    return this.service.getAllMetrics();
  }
}
