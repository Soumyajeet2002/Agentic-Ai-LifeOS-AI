import { Message } from '../entities/message.entity';

export class MessageMapper {
  static toResponse(message: Message) {
    return {
      id: message.id,
      conversationId: message.conversationId,
      role: message.role,
      content: message.content,
      metadata: message.metadata,
      createdAt: message.createdAt,
    };
  }

  static toResponseList(messages: Message[]) {
    return messages.map((message) =>
      MessageMapper.toResponse(message),
    );
  }
}