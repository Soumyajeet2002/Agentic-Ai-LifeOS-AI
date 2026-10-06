import { ToolExecution } from '../entities/tool-execution.entity';

export class ToolExecutionMapper {
  static toResponse(execution: ToolExecution) {
    return {
      id: execution.id,
      toolId: execution.toolId,
      agentRunId: execution.agentRunId,
      status: execution.status,
      input: execution.input,
      output: execution.output,
      error: execution.error,
      startedAt: execution.startedAt,
      completedAt: execution.completedAt,
    };
  }
}