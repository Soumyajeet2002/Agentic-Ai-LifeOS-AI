"use client";

import { useCallback, useState } from "react";

import { mockGoals } from "../data/mockGoals";
import type { Goal } from "../types/goal";

export function useGoals() {
  const [goals, setGoals] =
    useState<Goal[]>(mockGoals);

  const createGoal = useCallback(
    (data: {
      title: string;
      description: string;
      deadline: string;
    }) => {
      const now = new Date().toISOString();

      const newGoal: Goal = {
        id: `goal-${Date.now()}`,
        title: data.title,
        description: data.description,
        status: "active",
        progress: 0,
        deadline: data.deadline || null,
        nextAction: null,
        milestones: [],
        taskIds: [],
        createdAt: now,
        updatedAt: now,
      };

      setGoals((current) => [
        newGoal,
        ...current,
      ]);
    },
    [],
  );

  const archiveGoal = useCallback(
    (goalId: string) => {
      setGoals((current) =>
        current.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                status: "archived",
                updatedAt:
                  new Date().toISOString(),
              }
            : goal,
        ),
      );
    },
    [],
  );

  return {
    goals,
    createGoal,
    archiveGoal,
  };
}