import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { KnowledgeService } from './knowledge.service';

import { CreateKnowledgeDocumentDto } from './dto/create-knowledge-document.dto';
import { UpdateKnowledgeDocumentDto } from './dto/update-knowledge-document.dto';
import { CreateKnowledgeChunkDto } from './dto/create-knowledge-chunk.dto';
import { UpdateKnowledgeChunkDto } from './dto/update-knowledge-chunk.dto';

@ApiTags('Knowledge')
@Controller('knowledge')
export class KnowledgeController {
  constructor(
    private readonly knowledgeService: KnowledgeService,
  ) {}

  // ---------------------------------------------------------------------------
  // Documents
  // ---------------------------------------------------------------------------

  @Post('documents')
  @ApiOperation({
    summary: 'Create a knowledge document',
  })
  @ApiResponse({
    status: 201,
    description: 'Knowledge document created successfully.',
  })
  createDocument(
    @Body() dto: CreateKnowledgeDocumentDto,
  ) {
    return this.knowledgeService.createDocument(dto);
  }

  @Get('documents')
  @ApiOperation({
    summary: 'Get all knowledge documents',
  })
  findAllDocuments() {
    return this.knowledgeService.findAllDocuments();
  }

  @Get('documents/user/:userId')
  @ApiOperation({
    summary: 'Get knowledge documents by user',
  })
  findDocumentsByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.knowledgeService.findDocumentsByUserId(
      userId,
    );
  }

  @Get('documents/:id')
  @ApiOperation({
    summary: 'Get a knowledge document by id',
  })
  findDocumentById(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.knowledgeService.findDocumentById(id);
  }

  @Patch('documents/:id')
  @ApiOperation({
    summary: 'Update a knowledge document',
  })
  updateDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateKnowledgeDocumentDto,
  ) {
    return this.knowledgeService.updateDocument(
      id,
      dto,
    );
  }

  @Delete('documents/:id')
  @ApiOperation({
    summary: 'Delete a knowledge document',
  })
  removeDocument(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.knowledgeService.removeDocument(id);
  }

  // ---------------------------------------------------------------------------
  // Chunks
  // ---------------------------------------------------------------------------

  @Post('chunks')
  @ApiOperation({
    summary: 'Create a knowledge chunk',
  })
  @ApiResponse({
    status: 201,
    description: 'Knowledge chunk created successfully.',
  })
  createChunk(
    @Body() dto: CreateKnowledgeChunkDto,
  ) {
    return this.knowledgeService.createChunk(dto);
  }

  @Get('chunks')
  @ApiOperation({
    summary: 'Get all knowledge chunks',
  })
  findAllChunks() {
    return this.knowledgeService.findAllChunks();
  }

  @Get('chunks/document/:documentId')
  @ApiOperation({
    summary: 'Get chunks belonging to a document',
  })
  findChunksByDocument(
    @Param(
      'documentId',
      ParseUUIDPipe,
    )
    documentId: string,
  ) {
    return this.knowledgeService.findChunksByDocumentId(
      documentId,
    );
  }

  @Get('chunks/:id')
  @ApiOperation({
    summary: 'Get a knowledge chunk by id',
  })
  findChunkById(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.knowledgeService.findChunkById(id);
  }

  @Patch('chunks/:id')
  @ApiOperation({
    summary: 'Update a knowledge chunk',
  })
  updateChunk(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateKnowledgeChunkDto,
  ) {
    return this.knowledgeService.updateChunk(
      id,
      dto,
    );
  }

  @Delete('chunks/:id')
  @ApiOperation({
    summary: 'Delete a knowledge chunk',
  })
  removeChunk(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.knowledgeService.removeChunk(id);
  }
}