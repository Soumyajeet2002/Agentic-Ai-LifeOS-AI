export type IntegrationStatus =
  | "connected"
  | "available"
  | "coming_soon";

export type IntegrationCategory =
  | "productivity"
  | "communication"
  | "storage"
  | "knowledge";

export interface Integration {
  id: string;

  name: string;
  description: string;

  category: IntegrationCategory;

  status: IntegrationStatus;

  connectedAt?: string;

  permissions: string[];
}