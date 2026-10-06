import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateMilestoneDto {
  @ApiPropertyOptional({
    description: 'Updated milestone title.',
    example: 'Complete NestJS backend architecture',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated milestone description.',
    example: 'Finish all core backend modules and API documentation.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated milestone status.',
    example: 'completed',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Updated position of the milestone.',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiPropertyOptional({
    description: 'Updated milestone due date and time in ISO 8601 format.',
    example: '2026-12-15T23:59:59.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dueAt?: string;
}