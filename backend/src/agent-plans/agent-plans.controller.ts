import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateAgentPlanDto } from './dto/create-agent-plan.dto';
import { UpdateAgentPlanDto } from './dto/update-agent-plan.dto';
import { AgentPlansService } from './agent-plans.service';

@ApiTags('Agent Plans')
@Controller('agent-plans')
export class AgentPlansController {
  constructor(
    private readonly agentPlansService: AgentPlansService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create an agent plan',
  })
  @ApiResponse({
    status: 201,
  })
  create(
    @Body()
    createDto: CreateAgentPlanDto,
  ) {
    return this.agentPlansService.create(
      createDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all agent plans',
  })
  findAll() {
    return this.agentPlansService.findAll();
  }

  @Get('run/:agentRunId')
  @ApiOperation({
    summary: 'Get plans for an agent run',
  })
  @ApiParam({
    name: 'agentRunId',
    format: 'uuid',
  })
  findByAgentRunId(
    @Param('agentRunId', ParseUUIDPipe)
    agentRunId: string,
  ) {
    return this.agentPlansService.findByAgentRunId(
      agentRunId,
    );
  }

  @Get('status')
  @ApiOperation({
    summary: 'Get agent plans by status',
  })
  @ApiQuery({
    name: 'status',
    required: true,
    type: String,
  })
  findByStatus(
    @Query('status') status: string,
  ) {
    return this.agentPlansService.findByStatus(
      status,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an agent plan by id',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.agentPlansService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an agent plan',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateDto: UpdateAgentPlanDto,
  ) {
    return this.agentPlansService.update(
      id,
      updateDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an agent plan',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.agentPlansService.remove(id);
  }
}