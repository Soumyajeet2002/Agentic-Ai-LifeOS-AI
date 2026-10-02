export type KnowledgeType =
  | "document"
  | "note"
  | "research"
  | "conversation";

export interface KnowledgeItem {
  id: string;

  title: string;

  description: string;

  type: KnowledgeType;

  source: string;

  tags: string[];

  updatedAt: string;

  size?: string;
}