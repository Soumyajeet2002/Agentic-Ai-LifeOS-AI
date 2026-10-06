import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';

import { AgentEvent } from './entities/agent-event.entity';
import { CreateAgentEventDto } from './dto/create-agent-event.dto';
import { AgentEventMapper } from './mappers/agent-event.mapper';

@Injectable()
export class AgentEventsService {
  constructor(
    @InjectRepository(AgentEvent)
    private readonly agentEventRepository: Repository<AgentEvent>,

    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,
  ) {}

  async create(dto: CreateAgentEventDto) {
    const agentRun =
      await this.agentRunRepository.findOne({
        where: {
          id: dto.agentRunId,
        },
      });

    if (!agentRun) {
      throw new NotFoundException(
        `Agent run with id "${dto.agentRunId}" not found`,
      );
    }

    const event = this.agentEventRepository.create({
      id: randomUUID(),
      agentRunId: dto.agentRunId,
      eventType: dto.eventType,
      sequence: dto.sequence,
      payload: dto.payload ?? null,
    });

    const savedEvent =
      await this.agentEventRepository.save(event);

    return AgentEventMapper.toResponse(savedEvent);
  }

  async findAll() {
    const events =
      await this.agentEventRepository.find({
        order: {
          createdAt: 'ASC',
          sequence: 'ASC',
        },
      });

    return events.map(AgentEventMapper.toResponse);
  }

  async findOne(id: string) {
    const event =
      await this.agentEventRepository.findOne({
        where: {
          id,
        },
      });

    if (!event) {
      throw new NotFoundException(
        `Agent event with id "${id}" not found`,
      );
    }

    return AgentEventMapper.toResponse(event);
  }

  async findByAgentRunId(
    agentRunId: string,
  ) {
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

    const events =
      await this.agentEventRepository.find({
        where: {
          agentRunId,
        },
        order: {
          sequence: 'ASC',
          createdAt: 'ASC',
        },
      });

    return events.map(AgentEventMapper.toResponse);
  }

  async findByEventType(
    eventType: string,
  ) {
    const events =
      await this.agentEventRepository.find({
        where: {
          eventType,
        },
        order: {
          createdAt: 'ASC',
          sequence: 'ASC',
        },
      });

    return events.map(AgentEventMapper.toResponse);
  }

  async remove(id: string) {
    const event =
      await this.agentEventRepository.findOne({
        where: {
          id,
        },
      });

    if (!event) {
      throw new NotFoundException(
        `Agent event with id "${id}" not found`,
      );
    }

    await this.agentEventRepository.remove(event);

    return {
      message: 'Agent event deleted successfully',
      id,
    };
  }
}