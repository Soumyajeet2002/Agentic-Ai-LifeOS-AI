import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';

import { CreateAgentPlanDto } from './dto/create-agent-plan.dto';
import { UpdateAgentPlanDto } from './dto/update-agent-plan.dto';
import { AgentPlan } from './entities/agent-plan.entity';
import { AgentPlanMapper } from './mappers/agent-plan.mapper';

@Injectable()
export class AgentPlansService {
  constructor(
    @InjectRepository(AgentPlan)
    private readonly agentPlanRepository: Repository<AgentPlan>,

    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,
  ) {}

  async create(createDto: CreateAgentPlanDto) {
    const agentRun =
      await this.agentRunRepository.findOne({
        where: {
          id: createDto.agentRunId,
        },
      });

    if (!agentRun) {
      throw new NotFoundException(
        `Agent run with id "${createDto.agentRunId}" not found`,
      );
    }

    const plan = this.agentPlanRepository.create({
      id: randomUUID(),
      agentRunId: createDto.agentRunId,
      status: createDto.status ?? 'draft',
      summary: createDto.summary ?? null,
    });

    const savedPlan =
      await this.agentPlanRepository.save(plan);

    return AgentPlanMapper.toResponse(savedPlan);
  }

  async findAll() {
    const plans =
      await this.agentPlanRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return plans.map(AgentPlanMapper.toResponse);
  }

  async findOne(id: string) {
    const plan =
      await this.agentPlanRepository.findOne({
        where: {
          id,
        },
      });

    if (!plan) {
      throw new NotFoundException(
        `Agent plan with id "${id}" not found`,
      );
    }

    return AgentPlanMapper.toResponse(plan);
  }

  async findByAgentRunId(agentRunId: string) {
    const agentRun =
      await this.agentRunRepository.findOne({
        where: {
          id: agentRunId,
        },
      });

    if (!agentRun) {
      throw new NotFoundException(
        `Agent run with id "${agentRunId}" not found`,
      );
    }

    const plans =
      await this.agentPlanRepository.find({
        where: {
          agentRunId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return plans.map(AgentPlanMapper.toResponse);
  }

  async findByStatus(status: string) {
    const plans =
      await this.agentPlanRepository.find({
        where: {
          status,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return plans.map(AgentPlanMapper.toResponse);
  }

  async update(
    id: string,
    updateDto: UpdateAgentPlanDto,
  ) {
    const plan =
      await this.agentPlanRepository.findOne({
        where: {
          id,
        },
      });

    if (!plan) {
      throw new NotFoundException(
        `Agent plan with id "${id}" not found`,
      );
    }

    if (updateDto.status !== undefined) {
      plan.status = updateDto.status;
    }

    if (updateDto.summary !== undefined) {
      plan.summary = updateDto.summary;
    }

    const savedPlan =
      await this.agentPlanRepository.save(plan);

    return AgentPlanMapper.toResponse(savedPlan);
  }

  async remove(id: string) {
    const plan =
      await this.agentPlanRepository.findOne({
        where: {
          id,
        },
      });

    if (!plan) {
      throw new NotFoundException(
        `Agent plan with id "${id}" not found`,
      );
    }

    await this.agentPlanRepository.remove(plan);

    return {
      id,
      deleted: true,
    };
  }
}