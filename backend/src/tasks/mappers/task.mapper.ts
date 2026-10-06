import { Task } from '../entities/task.entity';

export class TaskMapper {
  static toResponse(task: Task) {
    return {
      id: task.id,
      userId: task.userId,
      projectId: task.projectId,
      goalId: task.goalId,
      milestoneId: task.milestoneId,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueAt: task.dueAt,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  static toResponseList(tasks: Task[]) {
    return tasks.map((task) =>
      TaskMapper.toResponse(task),
    );
  }
}