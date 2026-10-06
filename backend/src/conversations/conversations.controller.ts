import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationsService } from './conversations.service';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a conversation',
  })
  @ApiResponse({
    status: 201,
    description:
      'Conversation created successfully.',
  })
  async create(
    @Body()
    createConversationDto: CreateConversationDto,
  ) {
    return this.conversationsService.create(
      createConversationDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all conversations',
  })
  @ApiResponse({
    status: 200,
    description:
      'Conversations retrieved successfully.',
  })
  async findAll() {
    return this.conversationsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get conversations by user',
  })
  @ApiParam({
    name: 'userId',
    format: 'uuid',
  })
  async findByUserId(
    @Param(
      'userId',
      new ParseUUIDPipe(),
    )
    userId: string,
  ) {
    return this.conversationsService.findByUserId(
      userId,
    );
  }

  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get conversations by project',
  })
  @ApiParam({
    name: 'projectId',
    format: 'uuid',
  })
  async findByProjectId(
    @Param(
      'projectId',
      new ParseUUIDPipe(),
    )
    projectId: string,
  ) {
    return this.conversationsService.findByProjectId(
      projectId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a conversation by ID',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description:
      'Conversation retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversation not found.',
  })
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.conversationsService.findOne(
      id,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a conversation',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
    @Body()
    updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(
      id,
      updateConversationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a conversation',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.conversationsService.remove(
      id,
    );
  }
}