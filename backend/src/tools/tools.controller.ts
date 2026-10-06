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

import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@ApiTags('Tools')
@Controller('tools')
export class ToolsController {
  constructor(
    private readonly toolsService: ToolsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a tool',
  })
  @ApiResponse({
    status: 201,
    description: 'Tool created successfully.',
  })
  create(@Body() dto: CreateToolDto) {
    return this.toolsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tools',
  })
  findAll() {
    return this.toolsService.findAll();
  }

  @Get('enabled')
  @ApiOperation({
    summary: 'Get enabled tools',
  })
  findEnabled() {
    return this.toolsService.findEnabled();
  }

  @Get('by-name')
  @ApiOperation({
    summary: 'Get a tool by name',
  })
  findByName(@Query('name') name: string) {
    return this.toolsService.findByName(name);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a tool by id',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.toolsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a tool',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateToolDto,
  ) {
    return this.toolsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a tool',
  })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.toolsService.remove(id);
  }
}