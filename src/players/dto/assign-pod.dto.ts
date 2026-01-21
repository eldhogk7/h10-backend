import { IsUUID } from 'class-validator';

export class AssignPodDto {
  @IsUUID()
  pod_id: string;
}
