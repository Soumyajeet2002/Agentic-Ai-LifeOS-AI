"use client";

import {
  CalendarDays,
  Check,
  Circle,
  MoreHorizontal,
} from "lucide-react";

import type { Task } from "../types/task";

import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const completed =
    task.status === "completed";

  return (
    <article
      className={`${styles.card} ${
        completed ? styles.completed : ""
      }`}
    >
      <button
        type="button"
        className={styles.checkbox}
        onClick={() => onToggle(task.id)}
        aria-label={
          completed
            ? `Mark ${task.title} as incomplete`
            : `Complete ${task.title}`
        }
      >
        {completed ? (
          <Check size={13} />
        ) : (
          <Circle size={13} />
        )}
      </button>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3>{task.title}</h3>

          <span
            className={`${styles.priority} ${
              styles[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className={styles.description}>
            {task.description}
          </p>
        )}

        <div className={styles.meta}>
          {task.goalId && (
            <span className={styles.goal}>
              Goal connected
            </span>
          )}

          {task.dueDate && (
            <span className={styles.dueDate}>
              <CalendarDays size={12} />

              {new Date(
                task.dueDate,
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}

          {task.status === "in_progress" && (
            <span className={styles.inProgress}>
              In progress
            </span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          <MoreHorizontal size={15} />
        </button>

        <div className={styles.menu}>
          <button
            type="button"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(task.id)
            }
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}