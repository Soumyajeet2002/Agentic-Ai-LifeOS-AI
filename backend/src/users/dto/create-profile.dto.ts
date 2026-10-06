import {
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'UUID of the user associated with this profile.',
    example: '14d3b1e1-8b74-479c-8d26-2493766e2b9f',
  })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({
    description: 'Display name of the user.',
    example: 'Soumyajeet Nayak',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  displayName?: string;

  @ApiPropertyOptional({
    description: 'URL of the user profile avatar.',
    example: 'https://example.com/images/avatar.jpg',
    maxLength: 255,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'User timezone.',
    example: 'Asia/Kolkata',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  timezone?: string;

  @ApiPropertyOptional({
    description: 'User locale.',
    example: 'en-IN',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  locale?: string;
}