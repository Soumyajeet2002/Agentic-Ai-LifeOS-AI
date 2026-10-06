import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateToolExecutionDto {
  @IsUUID()
  toolId: string;

  @IsUUID()
  agentRunId: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  input?: Record<string, unknown>;
}