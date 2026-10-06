import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'UUID of the user creating the project.',
    example: '14d3b1e1-8b74-479c-8d26-2493766e2b9f',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Name of the project.',
    example: 'LifeOS Project',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the project.',
    example: 'Project for managing personal tasks and activities.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Status of the project.',
    example: 'active',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  status?: string;
}