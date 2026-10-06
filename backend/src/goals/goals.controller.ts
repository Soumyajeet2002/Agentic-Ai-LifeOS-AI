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

import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalsService } from './goals.service';

@ApiTags('Goals')
@Controller('goals')
export class GoalsController {
  constructor(
    private readonly goalsService: GoalsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a goal',
  })
  @ApiResponse({
    status: 201,
    description:
      'Goal created successfully.',
  })
  @ApiResponse({
    status: 404,
    description:
      'User or project not found.',
  })
  create(
    @Body()
    createGoalDto: CreateGoalDto,
  ) {
    return this.goalsService.create(
      createGoalDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all goals',
  })
  @ApiResponse({
    status: 200,
    description:
      'Goals retrieved successfully.',
  })
  findAll() {
    return this.goalsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get goals by user ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'User UUID.',
    example:
      '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  findByUserId(
    @Param(
      'userId',
      new ParseUUIDPipe(),
    )
    userId: string,
  ) {
    return this.goalsService.findByUserId(
      userId,
    );
  }

  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get goals by project ID',
  })
  @ApiParam({
    name: 'projectId',
    description: 'Project UUID.',
    example:
      '660e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found.',
  })
  findByProjectId(
    @Param(
      'projectId',
      new ParseUUIDPipe(),
    )
    projectId: string,
  ) {
    return this.goalsService.findByProjectId(
      projectId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a goal by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Goal UUID.',
    example:
      '770e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 404,
    description: 'Goal not found.',
  })
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.goalsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a goal',
  })
  @ApiParam({
    name: 'id',
    description: 'Goal UUID.',
    example:
      '770e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 404,
    description: 'Goal not found.',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
    @Body()
    updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.update(
      id,
      updateGoalDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a goal',
  })
  @ApiParam({
    name: 'id',
    description: 'Goal UUID.',
    example:
      '770e8400-d4d4-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 404,
    description: 'Goal not found.',
  })
  remove(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.goalsService.remove(id);
  }
}