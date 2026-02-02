import { IsInt, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlayerDto {
  @IsString()
  player_name: string;

  @IsInt()
  @Type(() => Number)
  age: number;

  @IsInt()
  @Type(() => Number)
  jersey_number: number;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  heartrate?: number;

  @IsOptional()
  @IsNumber({}, { message: 'height must be a number' })
  @Type(() => Number)
  height?: number;

  @IsOptional()
  @IsNumber({}, { message: 'weight must be a number' })
  @Type(() => Number)
  weight?: number;

  @IsOptional()
  @IsUUID()
  pod_id?: string;
}