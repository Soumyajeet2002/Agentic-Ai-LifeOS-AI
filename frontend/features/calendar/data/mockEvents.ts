import type { CalendarEvent } from "../types/event";

export const mockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Team Meeting",
    description: "Weekly project sync.",
    date: "2026-10-03",
    startTime: "09:00",
    endTime: "10:00",
    type: "meeting",
    goalId: null,
    taskId: null,
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "event-2",
    title: "Python Study",
    description: "Complete the OOP module.",
    date: "2026-10-03",
    startTime: "11:00",
    endTime: "12:30",
    type: "focus",
    goalId: "goal-1",
    taskId: "task-1",
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "event-3",
    title: "Website Development",
    description: "Continue homepage development.",
    date: "2026-10-03",
    startTime: "14:00",
    endTime: "16:00",
    type: "focus",
    goalId: "goal-2",
    taskId: "task-3",
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },

  {
    id: "event-4",
    title: "Gym",
    description: "Evening workout.",
    date: "2026-10-03",
    startTime: "17:30",
    endTime: "18:30",
    type: "personal",
    goalId: null,
    taskId: null,
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
  },
];