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

import { CreateToolExecutionDto } from './dto/create-tool-execution.dto';
import { UpdateToolExecutionDto } from './dto/update-tool-execution.dto';
import { ToolExecutionsService } from './tool-executions.service';

@ApiTags('Tool Executions')
@Controller('tool-executions')
export class ToolExecutionsController {
  constructor(
    private readonly toolExecutionsService: ToolExecutionsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a tool execution',
  })
  @ApiResponse({ status: 201 })
  create(
    @Body()
    createDto: CreateToolExecutionDto,
  ) {
    return this.toolExecutionsService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tool executions',
  })
  findAll() {
    return this.toolExecutionsService.findAll();
  }

  @Get('run/:agentRunId')
  @ApiOperation({
    summary: 'Get tool executions for an agent run',
  })
  @ApiParam({
    name: 'agentRunId',
    format: 'uuid',
  })
  findByAgentRunId(
    @Param('agentRunId', ParseUUIDPipe)
    agentRunId: string,
  ) {
    return this.toolExecutionsService.findByAgentRunId(
      agentRunId,
    );
  }

  @Get('tool/:toolId')
  @ApiOperation({
    summary: 'Get tool executions for a tool',
  })
  @ApiParam({
    name: 'toolId',
    format: 'uuid',
  })
  findByToolId(
    @Param('toolId', ParseUUIDPipe)
    toolId: string,
  ) {
    return this.toolExecutionsService.findByToolId(
      toolId,
    );
  }

  @Get('status')
  @ApiOperation({
    summary: 'Get tool executions by status',
  })
  @ApiQuery({
    name: 'status',
    required: true,
    type: String,
  })
  findByStatus(
    @Query('status') status: string,
  ) {
    return this.toolExecutionsService.findByStatus(
      status,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a tool execution by id',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.toolExecutionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a tool execution',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateDto: UpdateToolExecutionDto,
  ) {
    return this.toolExecutionsService.update(
      id,
      updateDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a tool execution',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.toolExecutionsService.remove(id);
  }
}