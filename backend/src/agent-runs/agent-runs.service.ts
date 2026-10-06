import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Conversation } from '../conversations/entities/conversation.entity';

import { AgentRun } from './entities/agent-run.entity';
import { CreateAgentRunDto } from './dto/create-agent-run.dto';
import { UpdateAgentRunDto } from './dto/update-agent-run.dto';
import { AgentRunMapper } from './mappers/agent-run.mapper';

@Injectable()
export class AgentRunsService {
  constructor(
    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async create(dto: CreateAgentRunDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: dto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id "${dto.userId}" not found`,
      );
    }

    if (dto.conversationId) {
      const conversation =
        await this.conversationRepository.findOne({
          where: {
            id: dto.conversationId,
          },
        });

      if (!conversation) {
        throw new NotFoundException(
          `Conversation with id "${dto.conversationId}" not found`,
        );
      }
    }

    const agentRun = this.agentRunRepository.create({
      id: randomUUID(),
      userId: dto.userId,
      conversationId: dto.conversationId ?? null,
      status: 'pending',
      input: dto.input ?? null,
      result: null,
      error: null,
      metadata: dto.metadata ?? null,
      startedAt: null,
      completedAt: null,
    });

    const savedRun =
      await this.agentRunRepository.save(agentRun);

    return AgentRunMapper.toResponse(savedRun);
  }

  async findAll() {
    const runs = await this.agentRunRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return runs.map(AgentRunMapper.toResponse);
  }

  async findOne(id: string) {
    const run =
      await this.agentRunRepository.findOne({
        where: {
          id,
        },
      });

    if (!run) {
      throw new NotFoundException(
        `Agent run with id "${id}" not found`,
      );
    }

    return AgentRunMapper.toResponse(run);
  }

  async findByUserId(userId: string) {
    const runs =
      await this.agentRunRepository.find({
        where: {
          userId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return runs.map(AgentRunMapper.toResponse);
  }

  async findByConversationId(
    conversationId: string,
  ) {
    const runs =
      await this.agentRunRepository.find({
        where: {
          conversationId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return runs.map(AgentRunMapper.toResponse);
  }

  async findByStatus(
    status: string,
  ) {
    const runs =
      await this.agentRunRepository.find({
        where: {
          status,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return runs.map(AgentRunMapper.toResponse);
  }

  async update(
    id: string,
    dto: UpdateAgentRunDto,
  ) {
    const run =
      await this.agentRunRepository.findOne({
        where: {
          id,
        },
      });

    if (!run) {
      throw new NotFoundException(
        `Agent run with id "${id}" not found`,
      );
    }

    if (dto.status !== undefined) {
      run.status = dto.status;
    }

    if (dto.input !== undefined) {
      run.input = dto.input;
    }

    if (dto.result !== undefined) {
      run.result = dto.result;
    }

    if (dto.error !== undefined) {
      run.error = dto.error;
    }

    if (dto.metadata !== undefined) {
      run.metadata = dto.metadata;
    }

    if (dto.startedAt !== undefined) {
      run.startedAt = new Date(dto.startedAt);
    }

    if (dto.completedAt !== undefined) {
      run.completedAt = new Date(dto.completedAt);
    }

    const updatedRun =
      await this.agentRunRepository.save(run);

    return AgentRunMapper.toResponse(updatedRun);
  }

  async remove(id: string) {
    const run =
      await this.agentRunRepository.findOne({
        where: {
          id,
        },
      });

    if (!run) {
      throw new NotFoundException(
        `Agent run with id "${id}" not found`,
      );
    }

    await this.agentRunRepository.remove(run);

    return {
      message: 'Agent run deleted successfully',
      id,
    };
  }
}