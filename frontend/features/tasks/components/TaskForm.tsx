"use client";

import { useState } from "react";

import type {
  Task,
  TaskPriority,
} from "../types/task";

import styles from "./TaskForm.module.css";

interface TaskFormProps {
  task?: Task;

  onSubmit: (data: {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string;
    goalId: string | null;
  }) => void;

  onCancel: () => void;
}

export function TaskForm({
  task,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] =
    useState(task?.title ?? "");

  const [description, setDescription] =
    useState(task?.description ?? "");

  const [priority, setPriority] =
    useState<TaskPriority>(
      task?.priority ?? "medium",
    );

  const [dueDate, setDueDate] =
    useState(task?.dueDate ?? "");

  const [goalId, setGoalId] =
    useState(task?.goalId ?? "");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      goalId: goalId || null,
    });
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="task-title">
          Task
        </label>

        <input
          id="task-title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="What needs to be done?"
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="task-description">
          Description
        </label>

        <textarea
          id="task-description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Add some context..."
          rows={3}
        />
      </div>

      <div className={styles.row}>
        <div>
          <label htmlFor="task-priority">
            Priority
          </label>

          <select
            id="task-priority"
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value as TaskPriority,
              )
            }
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="task-date">
            Due date
          </label>

          <input
            id="task-date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
          />
        </div>
      </div>

      <div>
        <label htmlFor="task-goal">
          Goal
        </label>

        <select
          id="task-goal"
          value={goalId}
          onChange={(event) =>
            setGoalId(event.target.value)
          }
        >
          <option value="">
            No goal
          </option>

          <option value="goal-1">
            Become job-ready in Python
          </option>

          <option value="goal-2">
            Launch personal website
          </option>
        </select>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancel}
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={styles.submit}
        >
          {task ? "Save changes" : "Create task"}
        </button>
      </div>
    </form>
  );
}