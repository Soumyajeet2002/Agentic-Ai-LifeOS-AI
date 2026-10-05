import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Check application health',
  })
  @ApiResponse({
    status: 200,
    description: 'Application is running.',
  })
  getHealth() {
    return this.healthService.getApplicationHealth();
  }

  @Get('database')
  @ApiOperation({
    summary: 'Check database health',
  })
  @ApiResponse({
    status: 200,
    description: 'Database health status.',
  })
  async getDatabaseHealth() {
    return this.healthService.getDatabaseHealth();
  }
}