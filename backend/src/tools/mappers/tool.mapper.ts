import { Tool } from '../entities/tool.entity';

export class ToolMapper {
  static toResponse(tool: Tool) {
    return {
      id: tool.id,
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      outputSchema: tool.outputSchema,
      riskLevel: tool.riskLevel,
      enabled: tool.enabled,
      createdAt: tool.createdAt,
    };
  }
}