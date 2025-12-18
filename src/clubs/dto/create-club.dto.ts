import { IsString, IsOptional } from 'class-validator';

export class CreateClubDto {
  @IsString()
  club_name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  sport?: string;

  // ✅ CLUB ADMIN INFO (FROM FRONTEND)
  @IsString()
  admin_name: string;

  @IsString()
  admin_email: string;

  @IsString()
  admin_password: string;

  @IsOptional()
  @IsString()
  pod_holder_id?: string;
}
