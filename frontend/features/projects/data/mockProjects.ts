import type { Project } from "../types/project";

export const mockProjects: Project[] = [
  {
    id: "project-1",

    name: "LifeOS Development",

    description:
      "Build and develop the LifeOS product.",

    memoryMode: "project-only",

    createdAt:
      "2026-09-28T10:00:00.000Z",

    updatedAt:
      "2026-10-01T10:00:00.000Z",
  },

  {
    id: "project-2",

    name: "Python Learning",

    description:
      "Become job-ready in Python.",

    memoryMode: "default",

    createdAt:
      "2026-09-25T10:00:00.000Z",

    updatedAt:
      "2026-09-30T10:00:00.000Z",
  },
];