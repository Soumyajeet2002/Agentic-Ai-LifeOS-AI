import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAgentRunDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  conversationId?: string;

  @IsOptional()
  @IsString()
  input?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}