import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AgentEventsService } from './agent-events.service';
import { CreateAgentEventDto } from './dto/create-agent-event.dto';

@ApiTags('Agent Events')
@Controller('agent-events')
export class AgentEventsController {
  constructor(
    private readonly agentEventsService: AgentEventsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create an agent event',
  })
  @ApiResponse({
    status: 201,
    description: 'Agent event created successfully.',
  })
  create(@Body() dto: CreateAgentEventDto) {
    return this.agentEventsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all agent events',
  })
  findAll() {
    return this.agentEventsService.findAll();
  }

  @Get('run/:agentRunId')
  @ApiOperation({
    summary: 'Get events for an agent run',
  })
  findByAgentRun(
    @Param(
      'agentRunId',
      ParseUUIDPipe,
    )
    agentRunId: string,
  ) {
    return this.agentEventsService.findByAgentRunId(
      agentRunId,
    );
  }

  @Get('type')
  @ApiOperation({
    summary: 'Get events by event type',
  })
  findByEventType(
    @Query('eventType') eventType: string,
  ) {
    return this.agentEventsService.findByEventType(
      eventType,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an agent event by id',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.agentEventsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an agent event',
  })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.agentEventsService.remove(id);
  }
}