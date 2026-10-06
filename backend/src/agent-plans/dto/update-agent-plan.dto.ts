import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAgentPlanDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  summary?: string;
}