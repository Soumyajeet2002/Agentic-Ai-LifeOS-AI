import {
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAgentRunDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  input?: string;

  @IsOptional()
  @IsString()
  result?: string;

  @IsOptional()
  @IsString()
  error?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;
}