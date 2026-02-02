import { Module } from '@nestjs/common';
import { ClubZonesService } from './club-zones.service';
import { ClubZonesController } from './club-zones.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ClubZonesService],
  controllers: [ClubZonesController],
})
export class ClubZonesModule {}
