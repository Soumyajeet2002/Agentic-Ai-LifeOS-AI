export type GoalStatus =
  | "active"
  | "completed"
  | "archived";

export interface GoalMilestone {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  progress: number;
  deadline: string | null;
  nextAction: string | null;
  milestones: GoalMilestone[];
  taskIds: string[];
  createdAt: string;
  updatedAt: string;
}