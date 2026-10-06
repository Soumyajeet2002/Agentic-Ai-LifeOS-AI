import { KnowledgeChunk } from '../entities/knowledge-chunk.entity';

export class KnowledgeChunkMapper {
  static toResponse(chunk: KnowledgeChunk) {
    return {
      id: chunk.id,
      documentId: chunk.documentId,
      content: chunk.content,
      position: chunk.position,
      metadata: chunk.metadata,
      createdAt: chunk.createdAt,
    };
  }
}