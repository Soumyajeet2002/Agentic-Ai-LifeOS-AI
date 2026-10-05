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

    activeProjectId: string | null;
    activeGoalId: string | null;
    activeChatId: string | null;

    setWorkspace: (
        workspace: Workspace,
    ) => void;

    setActiveProject: (
        projectId: string | null,
    ) => void;

    setActiveGoal: (
        goalId: string | null,
    ) => void;

    setActiveChat: (
        chatId: string | null,
    ) => void;
}

export const useWorkspaceStore =
    create<WorkspaceState>((set) => ({
        activeWorkspace: "home",

        activeProjectId: null,
        activeGoalId: null,
        activeChatId: null,

        setWorkspace: (workspace) =>
            set({
                activeWorkspace: workspace,
            }),

        setActiveProject: (projectId) =>
            set({
                activeProjectId: projectId,
            }),

        setActiveGoal: (goalId) =>
            set({
                activeGoalId: goalId,
            }),

        setActiveChat: (chatId) =>
            set({
                activeChatId: chatId,
            }),
    }));