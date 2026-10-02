"use client";

import { useCallback, useState } from "react";

import { mockAgentSession } from "../data/mockAgent";
import type {
    AgentAction,
    AgentSession,
} from "../types/agent";

export function useAgentSession() {
    const [session, setSession] =
        useState<AgentSession>(mockAgentSession);

    const reviewAction = useCallback(
        (action: AgentAction) => {
            setSession((current) => ({
                ...current,
                updatedAt: new Date().toISOString(),
            }));

            return action;
        },
        [],
    );

    const approveAction = useCallback(
        (action: AgentAction) => {
            setSession((current) => ({
                ...current,

                status: "executing",

                actions: current.actions.map((item) =>
                    item.id === action.id
                        ? {
                            ...item,
                            status: "in_progress",
                        }
                        : item,
                ),

                updatedAt: new Date().toISOString(),
            }));

            setTimeout(() => {
                setSession((current) => {
                    const updatedActions = current.actions.map((item) =>
                        item.id === action.id
                            ? {
                                ...item,
                                status: "completed" as const,
                            }
                            : item,
                    );

                    const hasRemainingWork = updatedActions.some(
                        (item) =>
                            item.status === "pending" ||
                            item.status === "in_progress",
                    );

                    return {
                        ...current,

                        status: hasRemainingWork
                            ? "executing"
                            : "completed",

                        actions: updatedActions,

                        activities: [
                            ...current.activities,
                            {
                                id: `activity-${Date.now()}`,
                                message: `${action.title} completed`,
                                status: "success",
                                createdAt: new Date().toISOString(),
                            },
                        ],

                        updatedAt: new Date().toISOString(),
                    };
                });
            }, 2000);
        },
        [],
    );

    const cancelAction = useCallback(
        (_action: AgentAction) => {
            setSession((current) => ({
                ...current,
                updatedAt: new Date().toISOString(),
            }));
        },
        [],
    );

    return {
        session,

        reviewAction,
        approveAction,
        cancelAction,
    };
}