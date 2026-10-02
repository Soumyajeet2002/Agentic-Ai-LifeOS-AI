import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Complete Python OOP module",
    description:
      "Finish the current OOP learning module.",
    status: "todo",
    priority: "high",
    dueDate: "2026-10-03",
    goalId: "goal-1",
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "task-2",
    title: "Practice Python data structures",
    description:
      "Solve ten practice problems using Python.",
    status: "in_progress",
    priority: "medium",
    dueDate: "2026-10-05",
    goalId: "goal-1",
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "task-3",
    title: "Finish homepage structure",
    description:
      "Complete the initial homepage layout.",
    status: "todo",
    priority: "high",
    dueDate: "2026-10-04",
    goalId: "goal-2",
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "task-4",
    title: "Setup project structure",
    description:
      "Create the initial project structure.",
    status: "completed",
    priority: "low",
    dueDate: null,
    goalId: "goal-2",
    createdAt: "2026-09-28T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },
];