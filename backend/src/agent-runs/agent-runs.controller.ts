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
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AgentRunsService } from './agent-runs.service';
import { CreateAgentRunDto } from './dto/create-agent-run.dto';
import { UpdateAgentRunDto } from './dto/update-agent-run.dto';

@ApiTags('Agent Runs')
@Controller('agent-runs')
export class AgentRunsController {
    constructor(
        private readonly agentRunsService: AgentRunsService,
    ) { }

    @Post()
    @ApiOperation({
        summary: 'Create an agent run',
    })
    @ApiResponse({
        status: 201,
        description: 'Agent run created successfully.',
    })
    create(@Body() dto: CreateAgentRunDto) {
        return this.agentRunsService.create(dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all agent runs',
    })
    findAll() {
        return this.agentRunsService.findAll();
    }

    @Get('user/:userId')
    @ApiOperation({
        summary: 'Get agent runs by user',
    })
    findByUser(
        @Param('userId', ParseUUIDPipe) userId: string,
    ) {
        return this.agentRunsService.findByUserId(
            userId,
        );
    }

    @Get('conversation/:conversationId')
    @ApiOperation({
        summary: 'Get agent runs by conversation',
    })
    findByConversation(
        @Param(
            'conversationId',
            ParseUUIDPipe,
        )
        conversationId: string,
    ) {
        return this.agentRunsService.findByConversationId(
            conversationId,
        );
    }

    @Get('status')
    @ApiOperation({
        summary: 'Get agent runs by status',
    })
    findByStatus(
        @Query('status') status: string,
    ) {
        return this.agentRunsService.findByStatus(
            status,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get an agent run by id',
    })
    findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.agentRunsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update an agent run',
    })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateAgentRunDto,
    ) {
        return this.agentRunsService.update(
            id,
            dto,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete an agent run',
    })
    remove(
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.agentRunsService.remove(id);
    }
}