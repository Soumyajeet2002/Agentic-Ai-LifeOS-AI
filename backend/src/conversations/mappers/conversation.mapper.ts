import { Conversation } from '../entities/conversation.entity';

export class ConversationMapper {
  static toResponse(
    conversation: Conversation,
  ) {
    return {
      id: conversation.id,
      userId: conversation.userId,
      projectId: conversation.projectId,
      title: conversation.title,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  }

  static toResponseList(
    conversations: Conversation[],
  ) {
    return conversations.map((conversation) =>
      ConversationMapper.toResponse(
        conversation,
      ),
    );
  }
}