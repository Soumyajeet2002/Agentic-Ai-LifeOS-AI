import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';
import { Tool } from '../tools/entities/tool.entity';

import { CreateToolExecutionDto } from './dto/create-tool-execution.dto';
import { UpdateToolExecutionDto } from './dto/update-tool-execution.dto';
import { ToolExecution } from './entities/tool-execution.entity';
import { ToolExecutionMapper } from './mappers/tool-execution.mapper';

@Injectable()
export class ToolExecutionsService {
  constructor(
    @InjectRepository(ToolExecution)
    private readonly toolExecutionRepository: Repository<ToolExecution>,

    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,

    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,
  ) {}

  async create(
    createDto: CreateToolExecutionDto,
  ) {
    const tool = await this.toolRepository.findOne({
      where: {
        id: createDto.toolId,
      },
    });

    if (!tool) {
      throw new NotFoundException(
        `Tool with id "${createDto.toolId}" not found`,
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

    const execution = this.toolExecutionRepository.create({
      id: randomUUID(),
      toolId: createDto.toolId,
      agentRunId: createDto.agentRunId,
      status: createDto.status ?? 'pending',
      input: createDto.input ?? null,
      output: null,
      error: null,
      startedAt: null,
      completedAt: null,
    });

    const savedExecution =
      await this.toolExecutionRepository.save(execution);

    return ToolExecutionMapper.toResponse(savedExecution);
  }

  async findAll() {
    const executions =
      await this.toolExecutionRepository.find();

    return executions.map(ToolExecutionMapper.toResponse);
  }

  async findOne(id: string) {
    const execution =
      await this.toolExecutionRepository.findOne({
        where: { id },
      });

    if (!execution) {
      throw new NotFoundException(
        `Tool execution with id "${id}" not found`,
      );
    }

    return ToolExecutionMapper.toResponse(execution);
  }

  async findByAgentRunId(agentRunId: string) {
    const agentRun =
      await this.agentRunRepository.findOne({
        where: { id: agentRunId },
      });

    if (!agentRun) {
      throw new NotFoundException(
        `Agent run with id "${agentRunId}" not found`,
      );
    }

    const executions =
      await this.toolExecutionRepository.find({
        where: { agentRunId },
      });

    return executions.map(ToolExecutionMapper.toResponse);
  }

  async findByToolId(toolId: string) {
    const tool = await this.toolRepository.findOne({
      where: { id: toolId },
    });

    if (!tool) {
      throw new NotFoundException(
        `Tool with id "${toolId}" not found`,
      );
    }

    const executions =
      await this.toolExecutionRepository.find({
        where: { toolId },
      });

    return executions.map(ToolExecutionMapper.toResponse);
  }

  async findByStatus(status: string) {
    const executions =
      await this.toolExecutionRepository.find({
        where: { status },
      });

    return executions.map(ToolExecutionMapper.toResponse);
  }

  async update(
    id: string,
    updateDto: UpdateToolExecutionDto,
  ) {
    const execution =
      await this.toolExecutionRepository.findOne({
        where: { id },
      });

    if (!execution) {
      throw new NotFoundException(
        `Tool execution with id "${id}" not found`,
      );
    }

    if (updateDto.status !== undefined) {
      execution.status = updateDto.status;
    }

    if (updateDto.input !== undefined) {
      execution.input = updateDto.input;
    }

    if (updateDto.output !== undefined) {
      execution.output = updateDto.output;
    }

    if (updateDto.error !== undefined) {
      execution.error = updateDto.error;
    }

    if (updateDto.startedAt !== undefined) {
      execution.startedAt = new Date(
        updateDto.startedAt,
      );
    }

    if (updateDto.completedAt !== undefined) {
      execution.completedAt = new Date(
        updateDto.completedAt,
      );
    }

    const savedExecution =
      await this.toolExecutionRepository.save(execution);

    return ToolExecutionMapper.toResponse(savedExecution);
  }

  async remove(id: string) {
    const execution =
      await this.toolExecutionRepository.findOne({
        where: { id },
      });

    if (!execution) {
      throw new NotFoundException(
        `Tool execution with id "${id}" not found`,
      );
    }

    await this.toolExecutionRepository.remove(execution);

    return {
      id,
      deleted: true,
    };
  }
}