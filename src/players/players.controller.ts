import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly svc: PlayersService) {}

  // CREATE PLAYER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLUB_ADMIN')
  @Post()
  async create(
    @Req() req: any,
    @Body() dto: CreatePlayerDto,
  ) {
    return this.svc.createPlayer(
      req.user.sub,
      req.user.club_id,
      dto,
    );
  }

  // ✅ GET PLAYERS OF MY CLUB
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLUB_ADMIN')
  @Get()
  async findMyClubPlayers(@Req() req: any) {
    return this.svc.findPlayersByClub(req.user.club_id);
  }
}
