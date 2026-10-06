import { AgentRun } from '../entities/agent-run.entity';

export class AgentRunMapper {
  static toResponse(run: AgentRun) {
    return {
      id: run.id,
      userId: run.userId,
      conversationId: run.conversationId,
      status: run.status,
      input: run.input,
      result: run.result,
      error: run.error,
      metadata: run.metadata,
      startedAt: run.startedAt,
      completedAt: run.completedAt,
      createdAt: run.createdAt,
    };
  }
}