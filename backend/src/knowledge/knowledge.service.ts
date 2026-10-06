import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';

import { KnowledgeDocument } from './entities/knowledge-document.entity';
import { KnowledgeChunk } from './entities/knowledge-chunk.entity';

import { CreateKnowledgeDocumentDto } from './dto/create-knowledge-document.dto';
import { UpdateKnowledgeDocumentDto } from './dto/update-knowledge-document.dto';
import { CreateKnowledgeChunkDto } from './dto/create-knowledge-chunk.dto';
import { UpdateKnowledgeChunkDto } from './dto/update-knowledge-chunk.dto';

import { KnowledgeDocumentMapper } from './mappers/knowledge-document.mapper';
import { KnowledgeChunkMapper } from './mappers/knowledge-chunk.mapper';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(KnowledgeDocument)
    private readonly documentRepository: Repository<KnowledgeDocument>,

    @InjectRepository(KnowledgeChunk)
    private readonly chunkRepository: Repository<KnowledgeChunk>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ---------------------------------------------------------------------------
  // Documents
  // ---------------------------------------------------------------------------

  async createDocument(
    dto: CreateKnowledgeDocumentDto,
  ) {
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

    const document = this.documentRepository.create({
      id: randomUUID(),
      userId: dto.userId,
      title: dto.title,
      source: dto.source ?? null,
      contentType: dto.contentType ?? null,
      externalId: dto.externalId ?? null,
      metadata: dto.metadata ?? null,
    });

    const savedDocument =
      await this.documentRepository.save(document);

    return KnowledgeDocumentMapper.toResponse(
      savedDocument,
    );
  }

  async findAllDocuments() {
    const documents =
      await this.documentRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return documents.map(
      KnowledgeDocumentMapper.toResponse,
    );
  }

  async findDocumentById(id: string) {
    const document =
      await this.documentRepository.findOne({
        where: {
          id,
        },
      });

    if (!document) {
      throw new NotFoundException(
        `Knowledge document with id "${id}" not found`,
      );
    }

    return KnowledgeDocumentMapper.toResponse(
      document,
    );
  }

  async findDocumentsByUserId(userId: string) {
    const documents =
      await this.documentRepository.find({
        where: {
          userId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    return documents.map(
      KnowledgeDocumentMapper.toResponse,
    );
  }

  async updateDocument(
    id: string,
    dto: UpdateKnowledgeDocumentDto,
  ) {
    const document =
      await this.documentRepository.findOne({
        where: {
          id,
        },
      });

    if (!document) {
      throw new NotFoundException(
        `Knowledge document with id "${id}" not found`,
      );
    }

    if (dto.title !== undefined) {
      document.title = dto.title;
    }

    if (dto.source !== undefined) {
      document.source = dto.source;
    }

    if (dto.contentType !== undefined) {
      document.contentType = dto.contentType;
    }

    if (dto.externalId !== undefined) {
      document.externalId = dto.externalId;
    }

    if (dto.metadata !== undefined) {
      document.metadata = dto.metadata;
    }

    const updatedDocument =
      await this.documentRepository.save(document);

    return KnowledgeDocumentMapper.toResponse(
      updatedDocument,
    );
  }

  async removeDocument(id: string) {
    const document =
      await this.documentRepository.findOne({
        where: {
          id,
        },
      });

    if (!document) {
      throw new NotFoundException(
        `Knowledge document with id "${id}" not found`,
      );
    }

    await this.documentRepository.remove(document);

    return {
      message: 'Knowledge document deleted successfully',
      id,
    };
  }

  // ---------------------------------------------------------------------------
  // Chunks
  // ---------------------------------------------------------------------------

  async createChunk(
    dto: CreateKnowledgeChunkDto,
  ) {
    const document =
      await this.documentRepository.findOne({
        where: {
          id: dto.documentId,
        },
      });

    if (!document) {
      throw new NotFoundException(
        `Knowledge document with id "${dto.documentId}" not found`,
      );
    }

    const chunk = this.chunkRepository.create({
      id: randomUUID(),
      documentId: dto.documentId,
      content: dto.content,
      position: dto.position ?? 0,
      metadata: dto.metadata ?? null,
    });

    const savedChunk =
      await this.chunkRepository.save(chunk);

    return KnowledgeChunkMapper.toResponse(
      savedChunk,
    );
  }

  async findAllChunks() {
    const chunks =
      await this.chunkRepository.find({
        order: {
          position: 'ASC',
          createdAt: 'ASC',
        },
      });

    return chunks.map(
      KnowledgeChunkMapper.toResponse,
    );
  }

  async findChunkById(id: string) {
    const chunk =
      await this.chunkRepository.findOne({
        where: {
          id,
        },
      });

    if (!chunk) {
      throw new NotFoundException(
        `Knowledge chunk with id "${id}" not found`,
      );
    }

    return KnowledgeChunkMapper.toResponse(chunk);
  }

  async findChunksByDocumentId(
    documentId: string,
  ) {
    const document =
      await this.documentRepository.findOne({
        where: {
          id: documentId,
        },
      });

    if (!document) {
      throw new NotFoundException(
        `Knowledge document with id "${documentId}" not found`,
      );
    }

    const chunks =
      await this.chunkRepository.find({
        where: {
          documentId,
        },
        order: {
          position: 'ASC',
          createdAt: 'ASC',
        },
      });

    return chunks.map(
      KnowledgeChunkMapper.toResponse,
    );
  }

  async updateChunk(
    id: string,
    dto: UpdateKnowledgeChunkDto,
  ) {
    const chunk =
      await this.chunkRepository.findOne({
        where: {
          id,
        },
      });

    if (!chunk) {
      throw new NotFoundException(
        `Knowledge chunk with id "${id}" not found`,
      );
    }

    if (dto.content !== undefined) {
      chunk.content = dto.content;
    }

    if (dto.position !== undefined) {
      chunk.position = dto.position;
    }

    if (dto.metadata !== undefined) {
      chunk.metadata = dto.metadata;
    }

    const updatedChunk =
      await this.chunkRepository.save(chunk);

    return KnowledgeChunkMapper.toResponse(
      updatedChunk,
    );
  }

  async removeChunk(id: string) {
    const chunk =
      await this.chunkRepository.findOne({
        where: {
          id,
        },
      });

    if (!chunk) {
      throw new NotFoundException(
        `Knowledge chunk with id "${id}" not found`,
      );
    }

    await this.chunkRepository.remove(chunk);

    return {
      message: 'Knowledge chunk deleted successfully',
      id,
    };
  }
}