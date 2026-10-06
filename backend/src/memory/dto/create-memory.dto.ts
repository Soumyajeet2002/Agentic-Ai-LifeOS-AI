import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMemoryDto {
  @IsUUID()
  userId: string;

  @IsString()
  type: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  importance?: number;

  @IsOptional()
  @IsNumber()
  confidence?: number;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}