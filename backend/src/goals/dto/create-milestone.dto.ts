import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateMilestoneDto {
  @ApiProperty({
    description: 'UUID of the goal associated with the milestone.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  goalId: string;

  @ApiProperty({
    description: 'Milestone title.',
    example: 'Complete backend architecture',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the milestone.',
    example: 'Complete the NestJS modules, entities, DTOs and APIs.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Current milestone status.',
    example: 'pending',
    default: 'pending',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Position of the milestone within the goal.',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiPropertyOptional({
    description: 'Optional milestone due date and time in ISO 8601 format.',
    example: '2026-11-30T23:59:59.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dueAt?: string;
}