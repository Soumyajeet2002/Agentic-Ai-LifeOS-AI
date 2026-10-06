import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateGoalDto {
  @ApiPropertyOptional({
    description: 'Updated goal title.',
    example: 'Build a production-ready Agentic AI assistant',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated goal description.',
    example: 'Complete the production AI assistant architecture.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated goal status.',
    example: 'completed',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Updated goal priority.',
    example: 'high',
  })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiPropertyOptional({
    description: 'Updated goal deadline in ISO 8601 format.',
    example: '2026-12-31T23:59:59.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;
}