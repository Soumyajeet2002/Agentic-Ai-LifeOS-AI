"use client";

import { useState } from "react";

import styles from "./GoalForm.module.css";

interface GoalFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    deadline: string;
  }) => void;

  onCancel: () => void;
}

export function GoalForm({
  onSubmit,
  onCancel,
}: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline,
    });
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="goal-title">
          Goal
        </label>

        <input
          id="goal-title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="What do you want to accomplish?"
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="goal-description">
          Description
        </label>

        <textarea
          id="goal-description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Describe what success looks like."
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="goal-deadline">
          Deadline
        </label>

        <input
          id="goal-deadline"
          type="date"
          value={deadline}
          onChange={(event) =>
            setDeadline(event.target.value)
          }
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={styles.submit}
        >
          Create goal
        </button>
      </div>
    </form>
  );
}