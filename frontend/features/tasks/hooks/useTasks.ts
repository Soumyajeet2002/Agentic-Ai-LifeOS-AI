"use client";

import { useCallback, useState } from "react";

import { mockTasks } from "../data/mockTasks";
import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../types/task";

interface CreateTaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  goalId: string | null;
}

interface UpdateTaskData extends CreateTaskData {
  status: TaskStatus;
}

export function useTasks() {
  const [tasks, setTasks] =
    useState<Task[]>(mockTasks);

  const createTask = useCallback(
    (data: CreateTaskData) => {
      const now = new Date().toISOString();

      const task: Task = {
        id: `task-${Date.now()}`,
        title: data.title,
        description: data.description,
        status: "todo",
        priority: data.priority,
        dueDate: data.dueDate || null,
        goalId: data.goalId,
        createdAt: now,
        updatedAt: now,
      };

      setTasks((current) => [
        task,
        ...current,
      ]);
    },
    [],
  );

  const updateTask = useCallback(
    (
      taskId: string,
      data: UpdateTaskData,
    ) => {
      setTasks((current) =>
        current.map((task) =>
          task.id === taskId
            ? {
                ...task,
                ...data,
                dueDate:
                  data.dueDate || null,
                updatedAt:
                  new Date().toISOString(),
              }
            : task,
        ),
      );
    },
    [],
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      setTasks((current) =>
        current.filter(
          (task) => task.id !== taskId,
        ),
      );
    },
    [],
  );

  const toggleTask = useCallback(
    (taskId: string) => {
      setTasks((current) =>
        current.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status:
                  task.status === "completed"
                    ? "todo"
                    : "completed",
                updatedAt:
                  new Date().toISOString(),
              }
            : task,
        ),
      );
    },
    [],
  );

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}