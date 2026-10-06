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

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a profile',
  })
  @ApiResponse({
    status: 201,
    description:
      'Profile created successfully.',
  })
  create(
    @Body()
    createProfileDto: CreateProfileDto,
  ) {
    return this.profilesService.create(
      createProfileDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all profiles',
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get profiles by user ID',
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
    return this.profilesService.findByUserId(
      userId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a profile by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Profile UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found.',
  })
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a profile',
  })
  @ApiParam({
    name: 'id',
    description: 'Profile UUID',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
    @Body()
    updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(
      id,
      updateProfileDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a profile',
  })
  @ApiParam({
    name: 'id',
    description: 'Profile UUID',
  })
  remove(
    @Param(
      'id',
      new ParseUUIDPipe(),
    )
    id: string,
  ) {
    return this.profilesService.remove(id);
  }
}