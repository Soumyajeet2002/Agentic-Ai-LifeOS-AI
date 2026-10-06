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

import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { MilestonesService } from './milestones.service';

@ApiTags('Milestones')
@Controller('milestones')
export class MilestonesController {
  constructor(
    private readonly milestonesService: MilestonesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a milestone',
  })
  @ApiResponse({
    status: 201,
    description:
      'Milestone created successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Goal not found.',
  })
  create(
    @Body()
    createMilestoneDto: CreateMilestoneDto,
  ) {
    return this.milestonesService.create(
      createMilestoneDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all milestones',
  })
  @ApiResponse({
    status: 200,
    description:
      'Milestones retrieved successfully.',
  })
  findAll() {
    return this.milestonesService.findAll();
  }

  @Get('goal/:goalId')
  @ApiOperation({
    summary: 'Get milestones by goal ID',
  })
  @ApiParam({
    name: 'goalId',
    description: 'Goal UUID.',
    example:
      '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 404,
    description: 'Goal not found.',
  })
  findByGoalId(
    @Param(
      'goalId',
      new ParseUUIDPipe(),
    )
    goalId: string,
  ) {
    return this.milestonesService.findByGoalId(
      goalId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a milestone by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Milestone UUID.',
    example:
      '660e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 404,
    description: 'Milestone not found.',
  })
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.milestonesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a milestone',
  })
  @ApiParam({
    name: 'id',
    description: 'Milestone UUID.',
    example:
      '660e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description:
      'Milestone updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Milestone not found.',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
    @Body()
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    return this.milestonesService.update(
      id,
      updateMilestoneDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a milestone',
  })
  @ApiParam({
    name: 'id',
    description: 'Milestone UUID.',
    example:
      '660e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description:
      'Milestone deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Milestone not found.',
  })
  remove(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.milestonesService.remove(id);
  }
}