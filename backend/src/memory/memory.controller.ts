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

import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';

@ApiTags('Memory')
@Controller('memory')
export class MemoryController {
  constructor(
    private readonly memoryService: MemoryService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a memory',
  })
  @ApiResponse({
    status: 201,
    description: 'Memory created successfully.',
  })
  create(@Body() dto: CreateMemoryDto) {
    return this.memoryService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all memories',
  })
  findAll() {
    return this.memoryService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get memories by user',
  })
  findByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.memoryService.findByUserId(userId);
  }

  @Get('user/:userId/type')
  @ApiOperation({
    summary: 'Get memories by user and type',
  })
  findByType(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('type') type: string,
  ) {
    return this.memoryService.findByType(
      userId,
      type,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a memory by id',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.memoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a memory',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMemoryDto,
  ) {
    return this.memoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a memory',
  })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.memoryService.remove(id);
  }
}