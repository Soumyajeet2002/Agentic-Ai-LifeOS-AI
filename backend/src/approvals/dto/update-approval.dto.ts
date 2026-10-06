import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateApprovalDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  riskLevel?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  resolvedAt?: string;
}