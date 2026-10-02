import type { AgentSession } from "../types/agent";

export const mockAgentSession: AgentSession = {
  id: "agent-session-001",

  status: "waiting_approval",

  goal: {
    id: "goal-001",
    title: "Launch my personal website in 30 days",
    description:
      "Create, test, and launch a personal portfolio website.",
    createdAt: "2026-10-01T09:00:00.000Z",
    deadline: "2026-10-31T23:59:59.000Z",
  },

  steps: [
    {
      id: "step-001",
      title: "Understand requirements",
      description:
        "Analyze the website goals, content, and technical requirements.",
      status: "completed",
      order: 1,
    },

    {
      id: "step-002",
      title: "Create project structure",
      description:
        "Prepare the application structure and development plan.",
      status: "completed",
      order: 2,
    },

    {
      id: "step-003",
      title: "Build the website",
      description:
        "Implement the website pages and core functionality.",
      status: "in_progress",
      order: 3,
    },

    {
      id: "step-004",
      title: "Test the website",
      description:
        "Verify functionality, responsiveness, and performance.",
      status: "pending",
      order: 4,
    },

    {
      id: "step-005",
      title: "Deploy the website",
      description:
        "Prepare and deploy the final website.",
      status: "pending",
      order: 5,
      requiresApproval: true,
    },
  ],

  actions: [
    {
      id: "action-001",
      type: "create",
      title: "Create website project",
      description:
        "Create the initial project structure.",
      tool: "Project Workspace",
      requiresApproval: false,
      status: "completed",
      createdAt: "2026-10-01T09:05:00.000Z",
    },

    {
      id: "action-002",
      type: "search",
      title: "Research portfolio structure",
      description:
        "Analyze common portfolio structures and identify useful sections.",
      tool: "Web Research",
      requiresApproval: false,
      status: "completed",
      createdAt: "2026-10-01T09:08:00.000Z",
    },

    {
      id: "action-003",
      type: "create",
      title: "Generate initial website structure",
      description:
        "Prepare the initial page structure.",
      tool: "Code Workspace",
      requiresApproval: false,
    //   status: "in_progress",
      status: "completed",
      createdAt: "2026-10-01T09:15:00.000Z",
    },

    {
      id: "action-004",
      type: "send",
      title: "Publish website",
      description:
        "Publish the completed website to the configured deployment service.",
      tool: "Deployment",
      requiresApproval: true,
      status: "pending",
      createdAt: "2026-10-01T09:20:00.000Z",
    },
  ],

  activities: [
    {
      id: "activity-001",
      message: "Goal analyzed",
      status: "success",
      createdAt: "2026-10-01T09:01:00.000Z",
    },

    {
      id: "activity-002",
      message: "Execution plan created",
      status: "success",
      createdAt: "2026-10-01T09:03:00.000Z",
    },

    {
      id: "activity-003",
      message: "Project structure created",
      status: "success",
      createdAt: "2026-10-01T09:05:00.000Z",
    },

    {
      id: "activity-004",
      message: "Website structure is being prepared",
      status: "info",
      createdAt: "2026-10-01T09:15:00.000Z",
    },

    {
      id: "activity-005",
      message: "Deployment will require your approval",
      status: "warning",
      createdAt: "2026-10-01T09:20:00.000Z",
    },
  ],

  createdAt: "2026-10-01T09:00:00.000Z",
  updatedAt: "2026-10-01T09:20:00.000Z",
};