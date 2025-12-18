import { Controller, Post, Body, Get } from '@nestjs/common';
import { PodsService } from './pods.service';
import { CreatePodDto } from './dto/create-pod.dto';

@Controller('pods')
export class PodsController {
  constructor(private svc: PodsService) {}

  @Post()
  create(@Body() dto: CreatePodDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }
}
