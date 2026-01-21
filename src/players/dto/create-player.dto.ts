import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  player_name: string;

  @IsInt()
  age: number;

  @IsInt()
  jersey_number: number;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUUID()
  pod_id?: string;
}