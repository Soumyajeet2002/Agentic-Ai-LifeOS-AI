export type ChatStatus =
  | "active"
  | "archived";

export interface ChatMessage {
  id: string;

  role:
    | "user"
    | "assistant"
    | "system";

  content: string;

  createdAt: string;
}

export interface Chat {
  id: string;

  title: string;

  projectId?: string;

  messages: ChatMessage[];

  status: ChatStatus;

  createdAt: string;

  updatedAt: string;
}