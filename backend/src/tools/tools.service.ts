import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { Tool } from './entities/tool.entity';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ToolMapper } from './mappers/tool.mapper';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
  ) {}

  async create(dto: CreateToolDto) {
    const tool = this.toolRepository.create({
      id: randomUUID(),
      name: dto.name,
      description: dto.description,
      inputSchema: dto.inputSchema,
      outputSchema: dto.outputSchema ?? null,
      riskLevel: dto.riskLevel ?? 'low',
      enabled: dto.enabled ?? true,
    });

    const savedTool =
      await this.toolRepository.save(tool);

    return ToolMapper.toResponse(savedTool);
  }

  async findAll() {
    const tools = await this.toolRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return tools.map(ToolMapper.toResponse);
  }

  async findEnabled() {
    const tools = await this.toolRepository.find({
      where: {
        enabled: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return tools.map(ToolMapper.toResponse);
  }

  async findOne(id: string) {
    const tool =
      await this.toolRepository.findOne({
        where: {
          id,
        },
      });

    if (!tool) {
      throw new NotFoundException(
        `Tool with id "${id}" not found`,
      );
    }

    return ToolMapper.toResponse(tool);
  }

  async findByName(name: string) {
    const tool =
      await this.toolRepository.findOne({
        where: {
          name,
        },
      });

    if (!tool) {
      throw new NotFoundException(
        `Tool with name "${name}" not found`,
      );
    }

    return ToolMapper.toResponse(tool);
  }

  async update(
    id: string,
    dto: UpdateToolDto,
  ) {
    const tool =
      await this.toolRepository.findOne({
        where: {
          id,
        },
      });

    if (!tool) {
      throw new NotFoundException(
        `Tool with id "${id}" not found`,
      );
    }

    if (dto.name !== undefined) {
      tool.name = dto.name;
    }

    if (dto.description !== undefined) {
      tool.description = dto.description;
    }

    if (dto.inputSchema !== undefined) {
      tool.inputSchema = dto.inputSchema;
    }

    if (dto.outputSchema !== undefined) {
      tool.outputSchema = dto.outputSchema;
    }

    if (dto.riskLevel !== undefined) {
      tool.riskLevel = dto.riskLevel;
    }

    if (dto.enabled !== undefined) {
      tool.enabled = dto.enabled;
    }

    const updatedTool =
      await this.toolRepository.save(tool);

    return ToolMapper.toResponse(updatedTool);
  }

  async remove(id: string) {
    const tool =
      await this.toolRepository.findOne({
        where: {
          id,
        },
      });

    if (!tool) {
      throw new NotFoundException(
        `Tool with id "${id}" not found`,
      );
    }

    await this.toolRepository.remove(tool);

    return {
      message: 'Tool deleted successfully',
      id,
    };
  }
}