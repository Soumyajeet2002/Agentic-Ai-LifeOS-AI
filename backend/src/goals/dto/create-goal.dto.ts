import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty({
    description: 'UUID of the user who owns the goal.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({
    description: 'UUID of the project associated with the goal.',
    example: '660e8400-e29b-41d4-a716-446655440000',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiProperty({
    description: 'Goal title.',
    example: 'Build a production-ready AI assistant',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the goal.',
    example: 'Build and deploy the core Agentic AI capabilities.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Current goal status.',
    example: 'active',
    default: 'active',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Goal priority.',
    example: 'high',
    default: 'medium',
  })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiPropertyOptional({
    description: 'Optional goal deadline in ISO 8601 format.',
    example: '2026-12-31T23:59:59.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;
}