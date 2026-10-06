import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';
import { GoalMapper } from './mappers/goal.mapper';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalsRepository: Repository<Goal>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async create(createGoalDto: CreateGoalDto) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createGoalDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    if (createGoalDto.projectId) {
      const project =
        await this.projectsRepository.findOne({
          where: {
            id: createGoalDto.projectId,
          },
        });

      if (!project) {
        throw new NotFoundException(
          'Project not found',
        );
      }
    }

    const goal =
      this.goalsRepository.create({
        id: randomUUID(),
        userId: createGoalDto.userId,
        projectId:
          createGoalDto.projectId ?? null,
        title: createGoalDto.title,
        description:
          createGoalDto.description ?? null,
        ...(createGoalDto.status !== undefined && {
          status: createGoalDto.status,
        }),
        ...(createGoalDto.priority !== undefined && {
          priority: createGoalDto.priority,
        }),
        deadline: createGoalDto.deadline
          ? new Date(createGoalDto.deadline)
          : null,
      });

    const savedGoal =
      await this.goalsRepository.save(goal);

    return GoalMapper.toResponse(savedGoal);
  }

  async findAll() {
    const goals =
      await this.goalsRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return GoalMapper.toResponseList(goals);
  }

  async findOne(id: string) {
    const goal =
      await this.goalsRepository.findOne({
        where: { id },
      });

    if (!goal) {
      throw new NotFoundException(
        'Goal not found',
      );
    }

    return GoalMapper.toResponse(goal);
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

    const goals =
      await this.goalsRepository.find({
        where: { userId },
        order: {
          createdAt: 'DESC',
        },
      });

    return GoalMapper.toResponseList(goals);
  }

  async findByProjectId(projectId: string) {
    const project =
      await this.projectsRepository.findOne({
        where: { id: projectId },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    const goals =
      await this.goalsRepository.find({
        where: { projectId },
        order: {
          createdAt: 'DESC',
        },
      });

    return GoalMapper.toResponseList(goals);
  }

  async update(
    id: string,
    updateGoalDto: UpdateGoalDto,
  ) {
    const goal =
      await this.goalsRepository.findOne({
        where: { id },
      });

    if (!goal) {
      throw new NotFoundException(
        'Goal not found',
      );
    }

    if (updateGoalDto.title !== undefined) {
      goal.title = updateGoalDto.title;
    }

    if (
      updateGoalDto.description !==
      undefined
    ) {
      goal.description =
        updateGoalDto.description;
    }

    if (updateGoalDto.status !== undefined) {
      goal.status = updateGoalDto.status;
    }

    if (
      updateGoalDto.priority !== undefined
    ) {
      goal.priority =
        updateGoalDto.priority;
    }

    if (
      updateGoalDto.deadline !== undefined
    ) {
      goal.deadline =
        new Date(updateGoalDto.deadline);
    }

    const updatedGoal =
      await this.goalsRepository.save(goal);

    return GoalMapper.toResponse(
      updatedGoal,
    );
  }

  async remove(id: string) {
    const goal =
      await this.goalsRepository.findOne({
        where: { id },
      });

    if (!goal) {
      throw new NotFoundException(
        'Goal not found',
      );
    }

    await this.goalsRepository.remove(goal);

    return {
      id,
      deleted: true,
    };
  }
}