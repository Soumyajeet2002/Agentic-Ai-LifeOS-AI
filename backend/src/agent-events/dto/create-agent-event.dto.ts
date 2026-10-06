import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAgentEventDto {
  @IsUUID()
  agentRunId: string;

  @IsString()
  eventType: string;

  @IsInt()
  sequence: number;

  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}