import { KnowledgeDocument } from '../entities/knowledge-document.entity';

export class KnowledgeDocumentMapper {
  static toResponse(document: KnowledgeDocument) {
    return {
      id: document.id,
      userId: document.userId,
      title: document.title,
      source: document.source,
      contentType: document.contentType,
      externalId: document.externalId,
      metadata: document.metadata,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}