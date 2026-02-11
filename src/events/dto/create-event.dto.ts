import { IsString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  event_name: string;

  @IsOptional()
  event_date?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  event_type?: string;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsString()
  ground_name?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  club_id: string;
}
