import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectMapper } from './mappers/project.mapper';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createProjectDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const project =
      this.projectsRepository.create({
        id: randomUUID(),
        userId: createProjectDto.userId,
        name: createProjectDto.name,
        description:
          createProjectDto.description ?? null,
        ...(createProjectDto.status !== undefined && {
          status: createProjectDto.status,
        }),
      });

    const savedProject =
      await this.projectsRepository.save(project);

    return ProjectMapper.toResponse(
      savedProject,
    );
  }

  async findAll() {
    const projects =
      await this.projectsRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return ProjectMapper.toResponseList(
      projects,
    );
  }

  async findOne(id: string) {
    const project =
      await this.projectsRepository.findOne({
        where: { id },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return ProjectMapper.toResponse(project);
  }

  async findByUserId(userId: string) {
    const user =
      await this.usersRepository.findOne({
        where: { id: userId },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const projects =
      await this.projectsRepository.find({
        where: { userId },
        order: {
          createdAt: 'DESC',
        },
      });

    return ProjectMapper.toResponseList(
      projects,
    );
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    const project =
      await this.projectsRepository.findOne({
        where: { id },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    if (updateProjectDto.name !== undefined) {
      project.name = updateProjectDto.name;
    }

    if (
      updateProjectDto.description !==
      undefined
    ) {
      project.description =
        updateProjectDto.description;
    }

    if (
      updateProjectDto.status !== undefined
    ) {
      project.status =
        updateProjectDto.status;
    }

    const updatedProject =
      await this.projectsRepository.save(
        project,
      );

    return ProjectMapper.toResponse(
      updatedProject,
    );
  }

  async remove(id: string) {
    const project =
      await this.projectsRepository.findOne({
        where: { id },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    await this.projectsRepository.remove(
      project,
    );

    return {
      id,
      deleted: true,
    };
  }
}