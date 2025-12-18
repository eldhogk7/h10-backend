import { IsOptional, IsString } from 'class-validator';

export class CreatePodDto {
  @IsOptional()
  @IsString()
  serial_number?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  firmware?: string;
}
