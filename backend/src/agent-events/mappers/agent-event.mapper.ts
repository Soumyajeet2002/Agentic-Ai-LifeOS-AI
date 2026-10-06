import { AgentEvent } from '../entities/agent-event.entity';

export class AgentEventMapper {
  static toResponse(event: AgentEvent) {
    return {
      id: event.id,
      agentRunId: event.agentRunId,
      eventType: event.eventType,
      sequence: event.sequence,
      payload: event.payload,
      createdAt: event.createdAt,
    };
  }
}