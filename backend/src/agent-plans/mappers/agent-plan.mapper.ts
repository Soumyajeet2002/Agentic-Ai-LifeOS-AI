import { AgentPlan } from '../entities/agent-plan.entity';

export class AgentPlanMapper {
  static toResponse(plan: AgentPlan) {
    return {
      id: plan.id,
      agentRunId: plan.agentRunId,
      status: plan.status,
      summary: plan.summary,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    };
  }
}