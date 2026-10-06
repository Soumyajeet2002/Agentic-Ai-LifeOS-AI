import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';

import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { ConversationMapper } from './mappers/conversation.mapper';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationsRepository: Repository<Conversation>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async create(
    createConversationDto: CreateConversationDto,
  ) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createConversationDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    if (createConversationDto.projectId) {
      const project =
        await this.projectsRepository.findOne({
          where: {
            id: createConversationDto.projectId,
          },
        });

      if (!project) {
        throw new NotFoundException(
          'Project not found',
        );
      }
    }

    const conversation =
      this.conversationsRepository.create({
        id: randomUUID(),
        userId: createConversationDto.userId,
        projectId:
          createConversationDto.projectId ??
          null,
        title:
          createConversationDto.title ?? null,
      });

    const savedConversation =
      await this.conversationsRepository.save(
        conversation,
      );

    return ConversationMapper.toResponse(
      savedConversation,
    );
  }

  async findAll() {
    const conversations =
      await this.conversationsRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return ConversationMapper.toResponseList(
      conversations,
    );
  }

  async findOne(id: string) {
    const conversation =
      await this.conversationsRepository.findOne({
        where: { id },
      });

    if (!conversation) {
      throw new NotFoundException(
        'Conversation not found',
      );
    }

    return ConversationMapper.toResponse(
      conversation,
    );
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

    const conversations =
      await this.conversationsRepository.find({
        where: { userId },
        order: {
          createdAt: 'DESC',
        },
      });

    return ConversationMapper.toResponseList(
      conversations,
    );
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

    const conversations =
      await this.conversationsRepository.find({
        where: { projectId },
        order: {
          createdAt: 'DESC',
        },
      });

    return ConversationMapper.toResponseList(
      conversations,
    );
  }

  async update(
    id: string,
    updateConversationDto: UpdateConversationDto,
  ) {
    const conversation =
      await this.conversationsRepository.findOne({
        where: { id },
      });

    if (!conversation) {
      throw new NotFoundException(
        'Conversation not found',
      );
    }

    if (
      updateConversationDto.title !==
      undefined
    ) {
      conversation.title =
        updateConversationDto.title;
    }

    const updatedConversation =
      await this.conversationsRepository.save(
        conversation,
      );

    return ConversationMapper.toResponse(
      updatedConversation,
    );
  }

  async remove(id: string) {
    const conversation =
      await this.conversationsRepository.findOne({
        where: { id },
      });

    if (!conversation) {
      throw new NotFoundException(
        'Conversation not found',
      );
    }

    await this.conversationsRepository.remove(
      conversation,
    );

    return {
      id,
      deleted: true,
    };
  }
}