import { Goal } from '../entities/goal.entity';

export class GoalMapper {
  static toResponse(goal: Goal) {
    return {
      id: goal.id,
      userId: goal.userId,
      projectId: goal.projectId,
      title: goal.title,
      description: goal.description,
      status: goal.status,
      priority: goal.priority,
      deadline: goal.deadline,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    };
  }

  static toResponseList(goals: Goal[]) {
    return goals.map((goal) =>
      GoalMapper.toResponse(goal),
    );
  }
}