export type EventType =
  | "meeting"
  | "focus"
  | "personal"
  | "task";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;

  date: string;
  startTime: string;
  endTime: string;

  type: EventType;

  goalId: string | null;
  taskId: string | null;

  createdAt: string;
  updatedAt: string;
}