import type { Integration } from "../types/integration";

export const mockIntegrations: Integration[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description:
      "Let LifeOS understand your schedule and help plan your time.",
    category: "productivity",
    status: "connected",
    connectedAt: "2026-09-28T10:00:00.000Z",
    permissions: [
      "View calendar events",
      "Create calendar events",
      "Update calendar events",
    ],
  },

  {
    id: "google-drive",
    name: "Google Drive",
    description:
      "Allow LifeOS to access documents and files relevant to your goals.",
    category: "storage",
    status: "connected",
    connectedAt: "2026-09-29T10:00:00.000Z",
    permissions: [
      "View files",
      "Search files",
    ],
  },

  {
    id: "gmail",
    name: "Gmail",
    description:
      "Allow LifeOS to help manage emails and communication.",
    category: "communication",
    status: "available",
    permissions: [
      "Read emails",
      "Draft emails",
      "Send emails with approval",
    ],
  },

  {
    id: "slack",
    name: "Slack",
    description:
      "Connect your workspace so LifeOS can work with team communication.",
    category: "communication",
    status: "available",
    permissions: [
      "Read messages",
      "Search conversations",
      "Send messages with approval",
    ],
  },

  {
    id: "notion",
    name: "Notion",
    description:
      "Connect your workspace and let LifeOS work with your notes and pages.",
    category: "knowledge",
    status: "available",
    permissions: [
      "Read pages",
      "Search workspace",
    ],
  },

  {
    id: "github",
    name: "GitHub",
    description:
      "Allow LifeOS to understand repositories, issues, and development work.",
    category: "productivity",
    status: "coming_soon",
    permissions: [],
  },
];