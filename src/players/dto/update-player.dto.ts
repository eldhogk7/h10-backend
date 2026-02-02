import { IsOptional, IsString, IsInt, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class HrZoneDto {
  @IsInt()
  @Type(() => Number)
  zone: number;

  @IsInt()
  @Type(() => Number)
  min: number;

  @IsInt()
  @Type(() => Number)
  max: number;
}

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  player_name?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  jersey_number?: number;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber({}, { message: 'height must be a number' })
  @Type(() => Number)
  height?: number;

  @IsOptional()
  @IsNumber({}, { message: 'weight must be a number' })
  @Type(() => Number)
  weight?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HrZoneDto)
  hr_zones?: HrZoneDto[];
}
