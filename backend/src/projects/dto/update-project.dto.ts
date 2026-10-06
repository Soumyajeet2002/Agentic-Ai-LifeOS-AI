import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'Updated name of the project.',
    example: 'LifeOS Project',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the project.',
    example: 'Updated project description.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated status of the project.',
    example: 'active',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  status?: string;
}