import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private svc: EventsService) { }

  @Post()
  create(@Req() req: any, @Body() dto: CreateEventDto) {
    dto.club_id = req.user.club_id;
    return this.svc.create(dto);
  }

  @Post('sync')
  async sync(@Req() req: any, @Body() dto: any) {
    console.log('🔄 Syncing event from mobile:', dto.event_id);
    dto.club_id = req.user.club_id;
    await this.svc.sync(dto);
    return { success: true, event_id: dto.event_id };
  }

  @Get()
  findAll(@Req() req: any) {
    if (req.user.role === 'SUPER_ADMIN') {
      return this.svc.findAll();
    }
    return this.svc.findAll(req.user.club_id);
  }

  @Get('session/:sessionId')
  findBySessionId(@Param('sessionId') sessionId: string) {
    return this.svc.findBySessionId(sessionId);
  }

  @Patch('session/:sessionId')
  updateBySessionId(@Param('sessionId') sessionId: string, @Body() dto: any) {
    return this.svc.updateBySessionId(sessionId, dto);
  }

  @Delete('session/:sessionId')
  deleteBySessionId(@Param('sessionId') sessionId: string) {
    return this.svc.deleteBySessionId(sessionId);
  }
}
