import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PodsService {
  constructor(private prisma: PrismaService) {}

  create(dto: any) {
    return this.prisma.pod.create({
      data: {
        serial_number: dto.serial_number,
        model: dto.model,
        firmware: dto.firmware,
      },
    });
  }

  findAll() {
    return this.prisma.pod.findMany();
  }
}
