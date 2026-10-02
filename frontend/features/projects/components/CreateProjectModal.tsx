"use client";

import { X } from "lucide-react";
import { useState } from "react";

import type {
  Project,
  ProjectMemoryMode,
} from "../types/project";

import styles from "./CreateProjectModal.module.css";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
}

export function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [memoryMode, setMemoryMode] =
    useState<ProjectMemoryMode>("default");

  if (!open) {
    return null;
  }

  function handleCreate() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const now = new Date().toISOString();

    const project: Project = {
      id: `project-${Date.now()}`,
      name: trimmedName,
      description:
        description.trim() ||
        "No project description yet.",
      memoryMode,
      createdAt: now,
      updatedAt: now,
    };

    onCreate(project);

    setName("");
    setDescription("");
    setMemoryMode("default");
  }

  return (
    <div
      className={styles.overlay}
      onMouseDown={onClose}
    >
      <div
        className={styles.modal}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <header className={styles.header}>
          <div>
            <span>NEW PROJECT</span>

            <h2>Create a project</h2>

            <p>
              Create a focused workspace for
              related conversations and work.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </header>

        <div className={styles.form}>
          <label>
            <span>Project name</span>

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. LifeOS Development"
              autoFocus
            />
          </label>

          <label>
            <span>Description</span>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder="What is this project about?"
              rows={3}
            />
          </label>

          <label>
            <span>Memory</span>

            <select
              value={memoryMode}
              onChange={(event) =>
                setMemoryMode(
                  event.target
                    .value as ProjectMemoryMode,
                )
              }
            >
              <option value="default">
                Default memory
              </option>

              <option value="project-only">
                Project-only memory
              </option>
            </select>
          </label>

          <div className={styles.memoryHelp}>
            {memoryMode === "default"
              ? "LifeOS can use your normal memory together with this project's context."
              : "LifeOS will keep this project's memory isolated from your default memory."}
          </div>
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.cancel}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.create}
            disabled={!name.trim()}
            onClick={handleCreate}
          >
            Create project
          </button>
        </footer>
      </div>
    </div>
  );
}