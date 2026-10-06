import { Milestone } from '../entities/milestone.entity';

export class MilestoneMapper {
  static toResponse(milestone: Milestone) {
    return {
      id: milestone.id,
      goalId: milestone.goalId,
      title: milestone.title,
      description: milestone.description,
      status: milestone.status,
      position: milestone.position,
      dueAt: milestone.dueAt,
      createdAt: milestone.createdAt,
      updatedAt: milestone.updatedAt,
    };
  }

  static toResponseList(milestones: Milestone[]) {
    return milestones.map((milestone) =>
      MilestoneMapper.toResponse(milestone),
    );
  }
}