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

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a task',
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully.',
  })
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(
      createTaskDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
  })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully.',
  })
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get tasks by user',
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
    return this.tasksService.findByUserId(
      userId,
    );
  }

  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get tasks by project',
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
    return this.tasksService.findByProjectId(
      projectId,
    );
  }

  @Get('goal/:goalId')
  @ApiOperation({
    summary: 'Get tasks by goal',
  })
  @ApiParam({
    name: 'goalId',
    format: 'uuid',
  })
  async findByGoalId(
    @Param(
      'goalId',
      new ParseUUIDPipe(),
    )
    goalId: string,
  ) {
    return this.tasksService.findByGoalId(
      goalId,
    );
  }

  @Get('milestone/:milestoneId')
  @ApiOperation({
    summary: 'Get tasks by milestone',
  })
  @ApiParam({
    name: 'milestoneId',
    format: 'uuid',
  })
  async findByMilestoneId(
    @Param(
      'milestoneId',
      new ParseUUIDPipe(),
    )
    milestoneId: string,
  ) {
    return this.tasksService.findByMilestoneId(
      milestoneId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task by ID',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task',
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
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      id,
      updateTaskDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task',
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
    return this.tasksService.remove(id);
  }
}