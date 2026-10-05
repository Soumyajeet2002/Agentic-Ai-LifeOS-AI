"use client";

import { create } from "zustand";

export type Workspace =
  | "home"
  | "chats"
  | "projects"
  | "goals"
  | "tasks"
  | "calendar"
  | "knowledge"
  | "memory"
  | "integrations";

interface WorkspaceState {
  activeWorkspace: Workspace;

  setWorkspace: (
    workspace: Workspace,
  ) => void;
}

export const useWorkspaceStore =
  create<WorkspaceState>((set) => ({
    activeWorkspace: "home",

    setWorkspace: (workspace) =>
      set({
        activeWorkspace: workspace,
      }),
  }));