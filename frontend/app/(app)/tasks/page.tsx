"use client";

import { useState } from "react";
import {
  Plus,
  X,
} from "lucide-react";

import { TaskCard } from "@/features/tasks/components/TaskCard";
import { TaskForm } from "@/features/tasks/components/TaskForm";
import { useTasks } from "@/features/tasks/hooks/useTasks";

import type {
  Task,
  TaskPriority,
} from "@/features/tasks/types/task";

import styles from "./page.module.css";

type TaskFilter =
  | "all"
  | "today"
  | "upcoming"
  | "completed";

export default function TasksPage() {
  const {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  const [filter, setFilter] =
    useState<TaskFilter>("all");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  function openCreate() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingTask(null);
  }

  function handleSubmit(data: {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string;
    goalId: string | null;
  }) {
    if (editingTask) {
      updateTask(
        editingTask.id,
        {
          ...data,
          status: editingTask.status,
        },
      );
    } else {
      createTask(data);
    }

    closeForm();
  }

  const filteredTasks = tasks.filter(
    (task) => {
      if (filter === "completed") {
        return task.status === "completed";
      }

      if (filter === "today") {
        const today = new Date()
          .toISOString()
          .split("T")[0];

        return task.dueDate === today;
      }

      if (filter === "upcoming") {
        const today = new Date()
          .toISOString()
          .split("T")[0];

        return (
          task.dueDate !== null &&
          task.dueDate > today &&
          task.status !== "completed"
        );
      }

      return true;
    },
  );

  const filters: {
    id: TaskFilter;
    label: string;
  }[] = [
    { id: "all", label: "All" },
    { id: "today", label: "Today" },
    {
      id: "upcoming",
      label: "Upcoming",
    },
    {
      id: "completed",
      label: "Completed",
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            EXECUTION
          </p>

          <h1>Tasks</h1>

          <p className={styles.description}>
            Focus on the work that moves your
            goals forward.
          </p>
        </div>

        <button
          type="button"
          className={styles.createButton}
          onClick={openCreate}
        >
          <Plus size={15} />
          New task
        </button>
      </header>

      {formOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <header
              className={styles.modalHeader}
            >
              <div>
                <p>
                  {editingTask
                    ? "UPDATE"
                    : "CREATE"}
                </p>

                <h2>
                  {editingTask
                    ? "Edit task"
                    : "New task"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </header>

            <TaskForm
              task={editingTask ?? undefined}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      <nav className={styles.filters}>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              filter === item.id
                ? styles.activeFilter
                : styles.filter
            }
            onClick={() =>
              setFilter(item.id)
            }
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className={styles.taskList}>
        <div className={styles.listHeader}>
          <h2>
            {
              filters.find(
                (item) =>
                  item.id === filter,
              )?.label
            }{" "}
            tasks
          </h2>

          <span>
            {filteredTasks.length} tasks
          </span>
        </div>

        {filteredTasks.length > 0 ? (
          <div className={styles.tasks}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onEdit={openEdit}
                onDelete={deleteTask}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>No tasks here</h3>

            <p>
              There are no tasks matching this
              filter.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}