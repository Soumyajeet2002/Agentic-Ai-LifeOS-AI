import type { Goal } from "../types/goal";

export const mockGoals: Goal[] = [
  {
    id: "goal-1",
    title: "Become job-ready in Python",
    description:
      "Build strong Python fundamentals and prepare for technical interviews.",
    status: "active",
    progress: 62,
    deadline: "2026-12-20",
    nextAction: "Complete Python OOP module",
    milestones: [
      {
        id: "milestone-1",
        title: "Python fundamentals",
        completed: true,
        order: 1,
      },
      {
        id: "milestone-2",
        title: "Object-oriented programming",
        completed: true,
        order: 2,
      },
      {
        id: "milestone-3",
        title: "Data structures",
        completed: false,
        order: 3,
      },
      {
        id: "milestone-4",
        title: "Interview preparation",
        completed: false,
        order: 4,
      },
    ],
    taskIds: [
      "task-python-oop",
      "task-python-dsa",
    ],
    createdAt: "2026-09-20T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "goal-2",
    title: "Launch personal website",
    description:
      "Design, develop, test and publish a personal portfolio website.",
    status: "active",
    progress: 38,
    deadline: "2026-12-10",
    nextAction: "Finish homepage structure",
    milestones: [
      {
        id: "milestone-5",
        title: "Requirements",
        completed: true,
        order: 1,
      },
      {
        id: "milestone-6",
        title: "Design",
        completed: true,
        order: 2,
      },
      {
        id: "milestone-7",
        title: "Development",
        completed: false,
        order: 3,
      },
      {
        id: "milestone-8",
        title: "Testing",
        completed: false,
        order: 4,
      },
      {
        id: "milestone-9",
        title: "Launch",
        completed: false,
        order: 5,
      },
    ],
    taskIds: [
      "task-homepage",
      "task-project-structure",
    ],
    createdAt: "2026-09-22T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },
];