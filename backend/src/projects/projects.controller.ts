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

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a project',
  })
  @ApiResponse({
    status: 201,
    description:
      'Project created successfully.',
  })
  create(
    @Body()
    createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(
      createProjectDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all projects',
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get projects by user ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'User UUID',
  })
  findByUserId(
    @Param(
      'userId',
      new ParseUUIDPipe(),
    )
    userId: string,
  ) {
    return this.projectsService.findByUserId(
      userId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a project by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Project UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found.',
  })
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a project',
  })
  @ApiParam({
    name: 'id',
    description: 'Project UUID',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
    @Body()
    updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      id,
      updateProjectDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a project',
  })
  @ApiParam({
    name: 'id',
    description: 'Project UUID',
  })
  remove(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.projectsService.remove(id);
  }
}