import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a message',
  })
  @ApiResponse({
    status: 201,
    description:
      'Message created successfully.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Conversation not found.',
  })
  async create(
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(
      createMessageDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all messages',
  })
  @ApiResponse({
    status: 200,
    description:
      'Messages retrieved successfully.',
  })
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get('conversation/:conversationId')
  @ApiOperation({
    summary:
      'Get messages for a conversation',
  })
  @ApiParam({
    name: 'conversationId',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description:
      'Conversation messages retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Conversation not found.',
  })
  async findByConversationId(
    @Param(
      'conversationId',
      new ParseUUIDPipe(),
    )
    conversationId: string,
  ) {
    return this.messagesService.findByConversationId(
      conversationId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a message by ID',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description:
      'Message retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Message not found.',
  })
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.messagesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a message',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description:
      'Message deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Message not found.',
  })
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.messagesService.remove(id);
  }
}