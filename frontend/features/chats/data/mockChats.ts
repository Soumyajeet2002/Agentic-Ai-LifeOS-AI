import type { Chat } from "../types/chat";

export const mockChats: Chat[] = [
  {
    id: "chat-1",
    projectId: "project-1",
    title: "Build my personal website",
    messages: [
      {
        id: "message-1",
        role: "user",
        content:
          "I want to launch my personal website in 30 days.",
        createdAt:
          "2026-10-01T09:00:00.000Z",
      },
      {
        id: "message-2",
        role: "assistant",
        content:
          "I can turn that goal into a structured plan and help you execute it.",
        createdAt:
          "2026-10-01T09:00:05.000Z",
      },
    ],
    status: "active",
    createdAt:
      "2026-10-01T09:00:00.000Z",
    updatedAt:
      "2026-10-01T09:00:05.000Z",
  },

  {
    id: "chat-2",
    projectId: "project-2",
    title: "Python learning plan",
    messages: [
      {
        id: "message-3",
        role: "user",
        content:
          "Create a plan to become job-ready in Python.",
        createdAt:
          "2026-09-30T08:00:00.000Z",
      },
    ],
    status: "active",
    createdAt:
      "2026-09-30T08:00:00.000Z",
    updatedAt:
      "2026-09-30T08:00:00.000Z",
  },
];