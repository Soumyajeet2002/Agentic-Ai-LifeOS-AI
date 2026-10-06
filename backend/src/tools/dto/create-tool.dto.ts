import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateToolDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsObject()
  inputSchema: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  outputSchema?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  riskLevel?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}