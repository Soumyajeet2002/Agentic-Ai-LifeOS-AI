import type { Memory } from "../types/memory";

export const mockMemories: Memory[] = [
  {
    id: "memory-1",
    content:
      "Prefers doing focused study sessions in the morning.",
    category: "preference",
    source: "Conversation",
    createdAt: "2026-09-28T10:00:00.000Z",
    updatedAt: "2026-09-28T10:00:00.000Z",
  },

  {
    id: "memory-2",
    content:
      "Current primary learning goal is becoming job-ready in Python.",
    category: "goal",
    source: "Goal",
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "memory-3",
    content:
      "Personal website project has a December deadline.",
    category: "context",
    source: "Project",
    createdAt: "2026-09-29T12:00:00.000Z",
    updatedAt: "2026-09-29T12:00:00.000Z",
  },

  {
    id: "memory-4",
    content:
      "Prefers concise explanations when reviewing technical concepts.",
    category: "preference",
    source: "Conversation",
    createdAt: "2026-09-30T08:00:00.000Z",
    updatedAt: "2026-09-30T08:00:00.000Z",
  },

  {
    id: "memory-5",
    content:
      "LifeOS development is currently focused on the frontend.",
    category: "context",
    source: "Project",
    createdAt: "2026-10-01T09:00:00.000Z",
    updatedAt: "2026-10-01T09:00:00.000Z",
  },
];