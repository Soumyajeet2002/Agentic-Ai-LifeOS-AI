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

import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { ApprovalsService } from './approvals.service';

@ApiTags('Approvals')
@Controller('approvals')
export class ApprovalsController {
  constructor(
    private readonly approvalsService: ApprovalsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create an approval',
  })
  @ApiResponse({
    status: 201,
  })
  create(
    @Body()
    createDto: CreateApprovalDto,
  ) {
    return this.approvalsService.create(
      createDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all approvals',
  })
  findAll() {
    return this.approvalsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get approvals for a user',
  })
  @ApiParam({
    name: 'userId',
    format: 'uuid',
  })
  findByUserId(
    @Param('userId', ParseUUIDPipe)
    userId: string,
  ) {
    return this.approvalsService.findByUserId(
      userId,
    );
  }

  @Get('run/:agentRunId')
  @ApiOperation({
    summary: 'Get approvals for an agent run',
  })
  @ApiParam({
    name: 'agentRunId',
    format: 'uuid',
  })
  findByAgentRunId(
    @Param('agentRunId', ParseUUIDPipe)
    agentRunId: string,
  ) {
    return this.approvalsService.findByAgentRunId(
      agentRunId,
    );
  }

  @Get('tool-execution/:toolExecutionId')
  @ApiOperation({
    summary:
      'Get approvals for a tool execution',
  })
  @ApiParam({
    name: 'toolExecutionId',
    format: 'uuid',
  })
  findByToolExecutionId(
    @Param(
      'toolExecutionId',
      ParseUUIDPipe,
    )
    toolExecutionId: string,
  ) {
    return this.approvalsService.findByToolExecutionId(
      toolExecutionId,
    );
  }

  @Get('status')
  @ApiOperation({
    summary: 'Get approvals by status',
  })
  @ApiQuery({
    name: 'status',
    required: true,
    type: String,
  })
  findByStatus(
    @Query('status') status: string,
  ) {
    return this.approvalsService.findByStatus(
      status,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an approval by id',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.approvalsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an approval',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateDto: UpdateApprovalDto,
  ) {
    return this.approvalsService.update(
      id,
      updateDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an approval',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.approvalsService.remove(id);
  }
}