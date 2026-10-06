import { Project } from '../entities/project.entity';

export class ProjectMapper {
  static toResponse(project: Project) {
    return {
      id: project.id,
      userId: project.userId,
      name: project.name,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  static toResponseList(projects: Project[]) {
    return projects.map((project) =>
      ProjectMapper.toResponse(project),
    );
  }
}