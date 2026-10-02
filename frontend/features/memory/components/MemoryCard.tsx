"use client";

import {
  Brain,
  MoreHorizontal,
  Target,
  User,
} from "lucide-react";

import type { Memory } from "../types/memory";

import styles from "./MemoryCard.module.css";

interface MemoryCardProps {
  memory: Memory;
  onEdit: (memory: Memory) => void;
  onForget: (memoryId: string) => void;
}

const categoryIcons = {
  preference: User,
  goal: Target,
  personal: User,
  context: Brain,
};

export function MemoryCard({
  memory,
  onEdit,
  onForget,
}: MemoryCardProps) {
  const Icon =
    categoryIcons[memory.category];

  return (
    <article className={styles.card}>
      <div className={styles.icon}>
        <Icon size={16} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.category}>
            {memory.category}
          </span>

          <div className={styles.actions}>
            <button
              type="button"
              aria-label="Memory actions"
            >
              <MoreHorizontal size={15} />
            </button>

            <div className={styles.menu}>
              <button
                type="button"
                onClick={() =>
                  onEdit(memory)
                }
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  onForget(memory.id)
                }
              >
                Forget
              </button>
            </div>
          </div>
        </div>

        <p>{memory.content}</p>

        <div className={styles.footer}>
          <span>
            Remembered from {memory.source}
          </span>

          <span>
            {new Date(
              memory.updatedAt,
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </article>
  );
}