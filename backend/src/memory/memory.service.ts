import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';

import { Memory } from './entities/memory.entity';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { MemoryMapper } from './mappers/memory.mapper';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private readonly memoryRepository: Repository<Memory>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateMemoryDto) {
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

    const memory = this.memoryRepository.create({
      id: randomUUID(),
      userId: dto.userId,
      type: dto.type,
      content: dto.content,
      importance: dto.importance ?? 5,
      confidence: dto.confidence ?? 1,
      source: dto.source ?? null,
      expiresAt: dto.expiresAt
        ? new Date(dto.expiresAt)
        : null,
    });

    const savedMemory =
      await this.memoryRepository.save(memory);

    return MemoryMapper.toResponse(savedMemory);
  }

  async findAll() {
    const memories =
      await this.memoryRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return memories.map(MemoryMapper.toResponse);
  }

  async findOne(id: string) {
    const memory =
      await this.memoryRepository.findOne({
        where: {
          id,
        },
      });

    if (!memory) {
      throw new NotFoundException(
        `Memory with id "${id}" not found`,
      );
    }

    return MemoryMapper.toResponse(memory);
  }

  async findByUserId(userId: string) {
    const memories =
      await this.memoryRepository.find({
        where: {
          userId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return memories.map(MemoryMapper.toResponse);
  }

  async findByType(
    userId: string,
    type: string,
  ) {
    const memories =
      await this.memoryRepository.find({
        where: {
          userId,
          type,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return memories.map(MemoryMapper.toResponse);
  }

  async update(
    id: string,
    dto: UpdateMemoryDto,
  ) {
    const memory =
      await this.memoryRepository.findOne({
        where: {
          id,
        },
      });

    if (!memory) {
      throw new NotFoundException(
        `Memory with id "${id}" not found`,
      );
    }

    if (dto.type !== undefined) {
      memory.type = dto.type;
    }

    if (dto.content !== undefined) {
      memory.content = dto.content;
    }

    if (dto.importance !== undefined) {
      memory.importance = dto.importance;
    }

    if (dto.confidence !== undefined) {
      memory.confidence = dto.confidence;
    }

    if (dto.source !== undefined) {
      memory.source = dto.source;
    }

    if (dto.expiresAt !== undefined) {
      memory.expiresAt = new Date(dto.expiresAt);
    }

    const updatedMemory =
      await this.memoryRepository.save(memory);

    return MemoryMapper.toResponse(updatedMemory);
  }

  async remove(id: string) {
    const memory =
      await this.memoryRepository.findOne({
        where: {
          id,
        },
      });

    if (!memory) {
      throw new NotFoundException(
        `Memory with id "${id}" not found`,
      );
    }

    await this.memoryRepository.remove(memory);

    return {
      message: 'Memory deleted successfully',
      id,
    };
  }
}