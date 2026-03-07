import { IsArray, ArrayMinSize, IsString } from 'class-validator';

export class CreatePodHolderDto {
  @IsArray()
  @IsString({ each: true })
  podIds: string[];
}
