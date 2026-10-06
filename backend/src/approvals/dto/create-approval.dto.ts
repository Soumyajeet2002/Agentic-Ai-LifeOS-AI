import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateApprovalDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  agentRunId: string;

  @IsOptional()
  @IsUUID()
  toolExecutionId?: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  riskLevel?: string;

  @IsOptional()
  @IsString()
  status?: string;
}