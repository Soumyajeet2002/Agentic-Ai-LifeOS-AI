import { Approval } from '../entities/approval.entity';

export class ApprovalMapper {
  static toResponse(approval: Approval) {
    return {
      id: approval.id,
      userId: approval.userId,
      agentRunId: approval.agentRunId,
      toolExecutionId: approval.toolExecutionId,
      action: approval.action,
      description: approval.description,
      riskLevel: approval.riskLevel,
      status: approval.status,
      createdAt: approval.createdAt,
      resolvedAt: approval.resolvedAt,
    };
  }
}