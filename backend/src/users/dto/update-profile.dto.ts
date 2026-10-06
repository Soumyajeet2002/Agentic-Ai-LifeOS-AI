import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
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