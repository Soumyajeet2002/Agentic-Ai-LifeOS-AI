import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { Conversation } from '../conversations/entities/conversation.entity';

import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessageMapper } from './mappers/message.mapper';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,

    @InjectRepository(Conversation)
    private readonly conversationsRepository: Repository<Conversation>,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
  ) {
    const conversation =
      await this.conversationsRepository.findOne({
        where: {
          id: createMessageDto.conversationId,
        },
      });

    if (!conversation) {
      throw new NotFoundException(
        'Conversation not found',
      );
    }

    const message =
      this.messagesRepository.create({
        id: randomUUID(),
        conversationId:
          createMessageDto.conversationId,
        role: createMessageDto.role,
        content: createMessageDto.content,
        metadata:
          createMessageDto.metadata ?? null,
      });

    const savedMessage =
      await this.messagesRepository.save(message);

    return MessageMapper.toResponse(
      savedMessage,
    );
  }

  async findAll() {
    const messages =
      await this.messagesRepository.find({
        order: {
          createdAt: 'ASC',
        },
      });

    return MessageMapper.toResponseList(
      messages,
    );
  }

  async findOne(id: string) {
    const message =
      await this.messagesRepository.findOne({
        where: { id },
      });

    if (!message) {
      throw new NotFoundException(
        'Message not found',
      );
    }

    return MessageMapper.toResponse(message);
  }

  async findByConversationId(
    conversationId: string,
  ) {
    const conversation =
      await this.conversationsRepository.findOne({
        where: {
          id: conversationId,
        },
      });

    if (!conversation) {
      throw new NotFoundException(
        'Conversation not found',
      );
    }

    const messages =
      await this.messagesRepository.find({
        where: {
          conversationId,
        },
        order: {
          createdAt: 'ASC',
        },
      });

    return MessageMapper.toResponseList(
      messages,
    );
  }

  async remove(id: string) {
    const message =
      await this.messagesRepository.findOne({
        where: { id },
      });

    if (!message) {
      throw new NotFoundException(
        'Message not found',
      );
    }

    await this.messagesRepository.remove(message);

    return {
      id,
      deleted: true,
    };
  }
}