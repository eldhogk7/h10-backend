import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ClubZonesService } from './club-zones.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('club-zones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClubZonesController {
  constructor(private clubZonesService: ClubZonesService) {}

  @Get('defaults')
  @Roles('CLUB_ADMIN')
  async getDefaults(@Request() req) {
    const { admin_id, club_id } = req.user;
    return this.clubZonesService.getClubZoneDefaults(admin_id, club_id);
  }

  @Post('defaults')
  @Roles('CLUB_ADMIN')
  async setDefaults(@Request() req, @Body() body: any) {
    const { admin_id, club_id } = req.user;
    const zones = body.zones || body;
    return this.clubZonesService.setClubZoneDefaults(admin_id, club_id, Array.isArray(zones) ? zones : [zones]);
  }
}
