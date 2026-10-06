import {
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAgentPlanDto {
  @IsUUID()
  agentRunId: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  summary?: string;
}