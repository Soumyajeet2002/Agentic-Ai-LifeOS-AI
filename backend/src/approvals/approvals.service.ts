import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';
import { ToolExecution } from '../tool-executions/entities/tool-execution.entity';
import { User } from '../users/entities/user.entity';

import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { Approval } from './entities/approval.entity';
import { ApprovalMapper } from './mappers/approval.mapper';

@Injectable()
export class ApprovalsService {
  constructor(
    @InjectRepository(Approval)
    private readonly approvalRepository: Repository<Approval>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,

    @InjectRepository(ToolExecution)
    private readonly toolExecutionRepository: Repository<ToolExecution>,
  ) {}

  async create(createDto: CreateApprovalDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: createDto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id "${createDto.userId}" not found`,
      );
    }

    const agentRun = await this.agentRunRepository.findOne({
      where: {
        id: createDto.agentRunId,
      },
    });

    if (!agentRun) {
      throw new NotFoundException(
        `Agent run with id "${createDto.agentRunId}" not found`,
      );
    }

    if (createDto.toolExecutionId) {
      const toolExecution =
        await this.toolExecutionRepository.findOne({
          where: {
            id: createDto.toolExecutionId,
          },
        });

      if (!toolExecution) {
        throw new NotFoundException(
          `Tool execution with id "${createDto.toolExecutionId}" not found`,
        );
      }
    }

    const approval = this.approvalRepository.create({
      id: randomUUID(),
      userId: createDto.userId,
      agentRunId: createDto.agentRunId,
      toolExecutionId:
        createDto.toolExecutionId ?? null,
      action: createDto.action,
      description:
        createDto.description ?? null,
      riskLevel:
        createDto.riskLevel ?? 'medium',
      status:
        createDto.status ?? 'pending',
      resolvedAt: null,
    });

    const savedApproval =
      await this.approvalRepository.save(approval);

    return ApprovalMapper.toResponse(savedApproval);
  }

  async findAll() {
    const approvals =
      await this.approvalRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return approvals.map(
      ApprovalMapper.toResponse,
    );
  }

  async findOne(id: string) {
    const approval =
      await this.approvalRepository.findOne({
        where: {
          id,
        },
      });

    if (!approval) {
      throw new NotFoundException(
        `Approval with id "${id}" not found`,
      );
    }

    return ApprovalMapper.toResponse(approval);
  }

  async findByUserId(userId: string) {
    const user =
      await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        `User with id "${userId}" not found`,
      );
    }

    const approvals =
      await this.approvalRepository.find({
        where: {
          userId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return approvals.map(
      ApprovalMapper.toResponse,
    );
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

    const approvals =
      await this.approvalRepository.find({
        where: {
          agentRunId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return approvals.map(
      ApprovalMapper.toResponse,
    );
  }

  async findByToolExecutionId(
    toolExecutionId: string,
  ) {
    const toolExecution =
      await this.toolExecutionRepository.findOne({
        where: {
          id: toolExecutionId,
        },
      });

    if (!toolExecution) {
      throw new NotFoundException(
        `Tool execution with id "${toolExecutionId}" not found`,
      );
    }

    const approvals =
      await this.approvalRepository.find({
        where: {
          toolExecutionId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return approvals.map(
      ApprovalMapper.toResponse,
    );
  }

  async findByStatus(status: string) {
    const approvals =
      await this.approvalRepository.find({
        where: {
          status,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return approvals.map(
      ApprovalMapper.toResponse,
    );
  }

  async update(
    id: string,
    updateDto: UpdateApprovalDto,
  ) {
    const approval =
      await this.approvalRepository.findOne({
        where: {
          id,
        },
      });

    if (!approval) {
      throw new NotFoundException(
        `Approval with id "${id}" not found`,
      );
    }

    if (updateDto.action !== undefined) {
      approval.action = updateDto.action;
    }

    if (updateDto.description !== undefined) {
      approval.description =
        updateDto.description;
    }

    if (updateDto.riskLevel !== undefined) {
      approval.riskLevel =
        updateDto.riskLevel;
    }

    if (updateDto.status !== undefined) {
      approval.status =
        updateDto.status;
    }

    if (updateDto.resolvedAt !== undefined) {
      approval.resolvedAt =
        new Date(updateDto.resolvedAt);
    }

    const savedApproval =
      await this.approvalRepository.save(
        approval,
      );

    return ApprovalMapper.toResponse(
      savedApproval,
    );
  }

  async remove(id: string) {
    const approval =
      await this.approvalRepository.findOne({
        where: {
          id,
        },
      });

    if (!approval) {
      throw new NotFoundException(
        `Approval with id "${id}" not found`,
      );
    }

    await this.approvalRepository.remove(
      approval,
    );

    return {
      id,
      deleted: true,
    };
  }
}