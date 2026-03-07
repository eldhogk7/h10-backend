import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { PodsService } from './pods.service';
import { CreatePodDto } from './dto/create-pod.dto';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('pods')
export class PodsController {
  constructor(private readonly svc: PodsService) { }

  /* ================= CREATE SINGLE POD ================= */
  @Post()
  async create(@Body() dto: CreatePodDto) {
    return this.svc.create(dto);
  }

  /* ================= CREATE PODS IN ONE BATCH ================= */
  @Post('batch')
  async createBatch(
    @Body() body: { count: number; pod_holder_id?: string; model?: string },
  ) {
    if (!body.count || body.count <= 0) {
      throw new BadRequestException('count must be greater than 0');
    }

    return this.svc.createMany(
      body.count,
      body.pod_holder_id,
      body.model,
    );
  }
  /* ================= GET PODS FOR LOGGED-IN CLUB ================= */
  @UseGuards(JwtAuthGuard)
  @Get('my-club')
  async getMyClubPods(@Req() req: any) {
    const clubId = req.user.club_id;

    if (!clubId) {
      throw new BadRequestException('Club not found for user');
    }

    return this.svc.findAvailablePodsForClub(clubId);
  }
  /* ================= GET ALL PODS ================= */
  @Get()
  async findAll() {
    return this.svc.findAll();
  }

  /* ================= GET PODS BY BATCH ================= */
  @Get('by-batch')
  async findByBatch(@Query('batch_id') batch_id: string) {
    if (!batch_id) {
      throw new BadRequestException('batch_id is required');
    }

    return this.svc.findByBatch(batch_id);
  }

  /* ================= UPDATE POD STATUS ================= */
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'ACTIVE' | 'ASSIGNED' | 'MAINTENANCE' | 'DAMAGED' | 'LOST' },
  ) {
    if (!body.status) {
      throw new BadRequestException('status is required');
    }

    return this.svc.updateStatus(id, body.status);
  }
}