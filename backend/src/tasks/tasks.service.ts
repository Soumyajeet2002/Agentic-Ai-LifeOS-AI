import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { Goal } from '../goals/entities/goal.entity';
import { Milestone } from '../goals/entities/milestone.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskMapper } from './mappers/task.mapper';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,

    @InjectRepository(Goal)
    private readonly goalsRepository: Repository<Goal>,

    @InjectRepository(Milestone)
    private readonly milestonesRepository: Repository<Milestone>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createTaskDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    if (createTaskDto.projectId) {
      const project =
        await this.projectsRepository.findOne({
          where: {
            id: createTaskDto.projectId,
          },
        });

      if (!project) {
        throw new NotFoundException(
          'Project not found',
        );
      }
    }

    if (createTaskDto.goalId) {
      const goal =
        await this.goalsRepository.findOne({
          where: {
            id: createTaskDto.goalId,
          },
        });

      if (!goal) {
        throw new NotFoundException(
          'Goal not found',
        );
      }
    }

    if (createTaskDto.milestoneId) {
      const milestone =
        await this.milestonesRepository.findOne({
          where: {
            id: createTaskDto.milestoneId,
          },
        });

      if (!milestone) {
        throw new NotFoundException(
          'Milestone not found',
        );
      }
    }

    const task =
      this.tasksRepository.create({
        id: randomUUID(),
        userId: createTaskDto.userId,
        projectId:
          createTaskDto.projectId ?? null,
        goalId:
          createTaskDto.goalId ?? null,
        milestoneId:
          createTaskDto.milestoneId ?? null,
        title: createTaskDto.title,
        description:
          createTaskDto.description ?? null,
        ...(createTaskDto.status !== undefined && {
          status: createTaskDto.status,
        }),
        ...(createTaskDto.priority !== undefined && {
          priority: createTaskDto.priority,
        }),
        dueAt: createTaskDto.dueAt
          ? new Date(createTaskDto.dueAt)
          : null,
        completedAt:
          createTaskDto.completedAt
            ? new Date(
                createTaskDto.completedAt,
              )
            : null,
      });

    const savedTask =
      await this.tasksRepository.save(task);

    return TaskMapper.toResponse(savedTask);
  }

  async findAll() {
    const tasks =
      await this.tasksRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return TaskMapper.toResponseList(tasks);
  }

  async findOne(id: string) {
    const task =
      await this.tasksRepository.findOne({
        where: { id },
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return TaskMapper.toResponse(task);
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

    const tasks =
      await this.tasksRepository.find({
        where: { userId },
        order: {
          createdAt: 'DESC',
        },
      });

    return TaskMapper.toResponseList(tasks);
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

    const tasks =
      await this.tasksRepository.find({
        where: { projectId },
        order: {
          createdAt: 'DESC',
        },
      });

    return TaskMapper.toResponseList(tasks);
  }

  async findByGoalId(goalId: string) {
    const goal =
      await this.goalsRepository.findOne({
        where: { id: goalId },
      });

    if (!goal) {
      throw new NotFoundException(
        'Goal not found',
      );
    }

    const tasks =
      await this.tasksRepository.find({
        where: { goalId },
        order: {
          createdAt: 'DESC',
        },
      });

    return TaskMapper.toResponseList(tasks);
  }

  async findByMilestoneId(
    milestoneId: string,
  ) {
    const milestone =
      await this.milestonesRepository.findOne({
        where: { id: milestoneId },
      });

    if (!milestone) {
      throw new NotFoundException(
        'Milestone not found',
      );
    }

    const tasks =
      await this.tasksRepository.find({
        where: { milestoneId },
        order: {
          createdAt: 'DESC',
        },
      });

    return TaskMapper.toResponseList(tasks);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task =
      await this.tasksRepository.findOne({
        where: { id },
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }

    if (
      updateTaskDto.description !== undefined
    ) {
      task.description =
        updateTaskDto.description;
    }

    if (updateTaskDto.status !== undefined) {
      task.status = updateTaskDto.status;
    }

    if (
      updateTaskDto.priority !== undefined
    ) {
      task.priority = updateTaskDto.priority;
    }

    if (updateTaskDto.dueAt !== undefined) {
      task.dueAt = updateTaskDto.dueAt
        ? new Date(updateTaskDto.dueAt)
        : null;
    }

    if (
      updateTaskDto.completedAt !== undefined
    ) {
      task.completedAt =
        updateTaskDto.completedAt
          ? new Date(
              updateTaskDto.completedAt,
            )
          : null;
    }

    const updatedTask =
      await this.tasksRepository.save(task);

    return TaskMapper.toResponse(updatedTask);
  }

  async remove(id: string) {
    const task =
      await this.tasksRepository.findOne({
        where: { id },
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    await this.tasksRepository.remove(task);

    return {
      id,
      deleted: true,
    };
  }
}