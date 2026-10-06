import {
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({
    description: 'UUID of the user creating the conversation.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({
    description: 'UUID of the project associated with the conversation.',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiPropertyOptional({
    description: 'Title of the conversation.',
    example: 'Project Planning Discussion',
  })
  @IsOptional()
  @IsString()
  title?: string;
}