import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateKnowledgeChunkDto {
  @IsUUID()
  documentId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}