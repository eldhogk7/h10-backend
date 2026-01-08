// src/club-admin/dto/update-club-admin.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClubAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;
}
