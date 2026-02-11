import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private svc: EventsService) { }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.svc.create(dto);
  }

  @Post('sync')
  async sync(@Body() dto: any) {
    console.log('🔄 Syncing event from mobile:', dto.event_id);
    await this.svc.sync(dto);
    return { success: true, event_id: dto.event_id };
  }

  @Get()
  findAll() {
    return this.svc.findAll();
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
