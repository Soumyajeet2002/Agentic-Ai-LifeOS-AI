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

import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { CalendarService } from './calendar.service';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
  constructor(
    private readonly calendarService: CalendarService,
  ) {}

  @Post('events')
  @ApiOperation({
    summary: 'Create a calendar event',
  })
  @ApiResponse({
    status: 201,
    description:
      'Calendar event created successfully.',
  })
  async create(
    @Body()
    createCalendarEventDto: CreateCalendarEventDto,
  ) {
    return this.calendarService.create(
      createCalendarEventDto,
    );
  }

  @Get('events')
  @ApiOperation({
    summary: 'Get all calendar events',
  })
  @ApiResponse({
    status: 200,
    description:
      'Calendar events retrieved successfully.',
  })
  async findAll() {
    return this.calendarService.findAll();
  }

  @Get('events/user/:userId')
  @ApiOperation({
    summary: 'Get calendar events by user',
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
    return this.calendarService.findByUserId(
      userId,
    );
  }

  @Get('events/:id')
  @ApiOperation({
    summary: 'Get a calendar event by ID',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description:
      'Calendar event retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Calendar event not found.',
  })
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.calendarService.findOne(id);
  }

  @Patch('events/:id')
  @ApiOperation({
    summary: 'Update a calendar event',
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
    updateCalendarEventDto: UpdateCalendarEventDto,
  ) {
    return this.calendarService.update(
      id,
      updateCalendarEventDto,
    );
  }

  @Delete('events/:id')
  @ApiOperation({
    summary: 'Delete a calendar event',
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
    return this.calendarService.remove(id);
  }
}