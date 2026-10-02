export type AgentStatus =
  | "idle"
  | "thinking"
  | "planning"
  | "waiting_approval"
  | "executing"
  | "completed"
  | "failed";

export type AgentStepStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "failed";

export type AgentActionType =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "send"
  | "schedule"
  | "search";

export interface AgentGoal {
  id: string;
  title: string;
  description?: string;

  createdAt: string;
  deadline?: string;
}

export interface AgentStep {
  id: string;

  title: string;
  description?: string;

  status: AgentStepStatus;

  order: number;

  requiresApproval?: boolean;
}

export interface AgentAction {
  id: string;

  type: AgentActionType;

  title: string;
  description?: string;

  tool?: string;

  requiresApproval: boolean;

  status: AgentStepStatus;

  createdAt: string;
}

export interface AgentActivity {
  id: string;

  message: string;

  status:
    | "info"
    | "success"
    | "warning"
    | "error";

  createdAt: string;
}

export interface AgentSession {
  id: string;

  goal: AgentGoal;

  status: AgentStatus;

  steps: AgentStep[];

  actions: AgentAction[];

  activities: AgentActivity[];

  createdAt: string;
  updatedAt: string;
}