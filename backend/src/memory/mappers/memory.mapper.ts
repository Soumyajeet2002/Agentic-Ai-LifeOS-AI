import { Memory } from '../entities/memory.entity';

export class MemoryMapper {
  static toResponse(memory: Memory) {
    return {
      id: memory.id,
      userId: memory.userId,
      type: memory.type,
      content: memory.content,
      importance: memory.importance,
      confidence: memory.confidence,
      source: memory.source,
      expiresAt: memory.expiresAt,
      createdAt: memory.createdAt,
      updatedAt: memory.updatedAt,
    };
  }
}