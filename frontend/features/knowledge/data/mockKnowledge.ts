import type { KnowledgeItem } from "../types/knowledge";

export const mockKnowledge: KnowledgeItem[] = [
  {
    id: "knowledge-1",
    title: "Python Notes",
    description:
      "Personal notes covering Python fundamentals, OOP, and advanced concepts.",
    type: "note",
    source: "LifeOS Notes",
    tags: ["python", "learning"],
    updatedAt: "2026-10-02T10:30:00.000Z",
  },

  {
    id: "knowledge-2",
    title: "Project Documentation",
    description:
      "Architecture and technical documentation for the personal website.",
    type: "document",
    source: "Uploaded document",
    tags: ["development", "project"],
    updatedAt: "2026-10-01T15:20:00.000Z",
    size: "2.4 MB",
  },

  {
    id: "knowledge-3",
    title: "Interview Preparation",
    description:
      "Questions, notes, and preparation material for upcoming interviews.",
    type: "research",
    source: "Research",
    tags: ["career", "interview"],
    updatedAt: "2026-09-30T12:10:00.000Z",
  },

  {
    id: "knowledge-4",
    title: "Agentic AI Research",
    description:
      "Research notes about AI agents, tools, memory, planning, and execution.",
    type: "research",
    source: "LifeOS Research",
    tags: ["AI", "agents", "research"],
    updatedAt: "2026-09-29T18:00:00.000Z",
  },

  {
    id: "knowledge-5",
    title: "Previous Planning Conversation",
    description:
      "Conversation containing plans and decisions related to the website project.",
    type: "conversation",
    source: "LifeOS Conversation",
    tags: ["planning", "project"],
    updatedAt: "2026-09-28T09:40:00.000Z",
  },
];