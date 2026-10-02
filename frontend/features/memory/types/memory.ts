export type MemoryCategory =
  | "preference"
  | "goal"
  | "personal"
  | "context";

export interface Memory {
  id: string;

  content: string;

  category: MemoryCategory;

  source: string;

  createdAt: string;
  updatedAt: string;
}