export type ProjectMemoryMode =
  | "default"
  | "project-only";

export interface Project {
  id: string;

  name: string;

  description: string;

  memoryMode: ProjectMemoryMode;

  createdAt: string;

  updatedAt: string;
}