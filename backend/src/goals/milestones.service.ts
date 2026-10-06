import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { Goal } from '../goals/entities/goal.entity';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { Milestone } from './entities/milestone.entity';
import { MilestoneMapper } from './mappers/milestone.mapper';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectRepository(Milestone)
    private readonly milestonesRepository: Repository<Milestone>,

    @InjectRepository(Goal)
    private readonly goalsRepository: Repository<Goal>,
  ) {}

  async create(
    createMilestoneDto: CreateMilestoneDto,
  ) {
    const goal =
      await this.goalsRepository.findOne({
        where: {
          id: createMilestoneDto.goalId,
        },
      });

    if (!goal) {
      throw new NotFoundException(
        'Goal not found',
      );
    }

    const milestone =
      this.milestonesRepository.create({
        id: randomUUID(),
        goalId: createMilestoneDto.goalId,
        title: createMilestoneDto.title,
        description:
          createMilestoneDto.description ?? null,
        ...(createMilestoneDto.status !== undefined && {
          status: createMilestoneDto.status,
        }),
        ...(createMilestoneDto.position !== undefined && {
          position: createMilestoneDto.position,
        }),
        dueAt: createMilestoneDto.dueAt
          ? new Date(createMilestoneDto.dueAt)
          : null,
      });

    const savedMilestone =
      await this.milestonesRepository.save(
        milestone,
      );

    return MilestoneMapper.toResponse(
      savedMilestone,
    );
  }

  async findAll() {
    const milestones =
      await this.milestonesRepository.find({
        order: {
          position: 'ASC',
          createdAt: 'DESC',
        },
      });

    return MilestoneMapper.toResponseList(
      milestones,
    );
  }

  async findOne(id: string) {
    const milestone =
      await this.milestonesRepository.findOne({
        where: { id },
      });

    if (!milestone) {
      throw new NotFoundException(
        'Milestone not found',
      );
    }

    return MilestoneMapper.toResponse(
      milestone,
    );
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

    const milestones =
      await this.milestonesRepository.find({
        where: { goalId },
        order: {
          position: 'ASC',
          createdAt: 'DESC',
        },
      });

    return MilestoneMapper.toResponseList(
      milestones,
    );
  }

  async update(
    id: string,
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    const milestone =
      await this.milestonesRepository.findOne({
        where: { id },
      });

    if (!milestone) {
      throw new NotFoundException(
        'Milestone not found',
      );
    }

    if (updateMilestoneDto.title !== undefined) {
      milestone.title =
        updateMilestoneDto.title;
    }

    if (
      updateMilestoneDto.description !==
      undefined
    ) {
      milestone.description =
        updateMilestoneDto.description;
    }

    if (updateMilestoneDto.status !== undefined) {
      milestone.status =
        updateMilestoneDto.status;
    }

    if (
      updateMilestoneDto.position !== undefined
    ) {
      milestone.position =
        updateMilestoneDto.position;
    }

    if (
      updateMilestoneDto.dueAt !== undefined
    ) {
      milestone.dueAt =
        new Date(updateMilestoneDto.dueAt);
    }

    const updatedMilestone =
      await this.milestonesRepository.save(
        milestone,
      );

    return MilestoneMapper.toResponse(
      updatedMilestone,
    );
  }

  async remove(id: string) {
    const milestone =
      await this.milestonesRepository.findOne({
        where: { id },
      });

    if (!milestone) {
      throw new NotFoundException(
        'Milestone not found',
      );
    }

    await this.milestonesRepository.remove(
      milestone,
    );

    return {
      id,
      deleted: true,
    };
  }
}