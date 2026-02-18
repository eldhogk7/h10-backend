import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PodHoldersService } from './pod-holders.service';
import { CreatePodHolderDto } from './dto/create-pod-holder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PodLifecycleStatus } from '@prisma/client';

@Controller('pod-holders')
export class PodHoldersController {
  constructor(private readonly svc: PodHoldersService) { }

  /* ================= CREATE ================= */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() dto: CreatePodHolderDto) {
    return this.svc.create(dto);
  }

  /* ================= AVAILABLE PODS (🔥 MUST BE BEFORE :id) ================= */
  @UseGuards(JwtAuthGuard)
  @Get('available')
  findAvailablePods() {
    return this.svc.findAvailablePods();
  }

  /* ================= UNASSIGNED POD HOLDERS ================= */
  @UseGuards(JwtAuthGuard)
  @Get('unassigned')
  findUnassignedPodHolders() {
    return this.svc.findUnassignedPodHolders();
  }

  /* ================= GET ALL ================= */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.svc.findAll(req.user);
  }

  /* ================= GET ONE (⚠️ ALWAYS LAST) ================= */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  /* ================= UPDATE STATUS ================= */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: PodLifecycleStatus,
  ) {
    return this.svc.updateStatus(id, status);
  }

  /* ================= ADD POD ================= */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/add-pod/:podId')
  addPod(
    @Param('id') podHolderId: string,
    @Param('podId') podId: string,
  ) {
    return this.svc.addPodToHolder(podHolderId, podId);
  }

  /* ================= REPLACE POD ================= */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/replace-pod')
  replacePod(
    @Param('id') podHolderId: string,
    @Body()
    body: {
      oldPodId: string;
      newPodId: string;
      performedBy?: string;
    },
  ) {
    return this.svc.replacePod({
      podHolderId,
      ...body,
    });
  }

  /* ================= REMOVE POD ================= */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/remove-pod/:podId')
  removePod(
    @Param('id') podHolderId: string,
    @Param('podId') podId: string,
  ) {
    return this.svc.removePodFromHolder(podHolderId, podId);
  }

  /* ================= ASSIGN TO CLUB ================= */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id/assign/:clubId')
  assign(
    @Param('id') podHolderId: string,
    @Param('clubId') clubId: string,
    @Req() req: any,
  ) {
    return this.svc.assignPodHolderToClub(
      podHolderId,
      clubId,
      req.user.sub,
    );
  }

  /* ================= UNASSIGN FROM CLUB ================= */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id/unassign')
  unassign(
    @Param('id') podHolderId: string,
    @Req() req: any,
  ) {
    return this.svc.unassignPodHolder(
      podHolderId,
      req.user.sub,
    );
  }

  /* ================= UPDATE WIFI CREDENTIALS ================= */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/wifi')
  updateWifi(
    @Param('id') id: string,
    @Body() body: { ssid: string; password?: string },
  ) {
    return this.svc.updateWifi(id, body.ssid, body.password);
  }

  /* ================= DELETE ================= */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
