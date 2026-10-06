import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateKnowledgeDocumentDto {
  @IsUUID()
  userId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  contentType?: string;

  @IsOptional()
  @IsString()
  externalId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}