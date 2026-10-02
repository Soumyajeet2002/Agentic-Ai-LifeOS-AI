"use client";

import { useMemo, useState } from "react";
import {
  Brain,
  Plus,
  Search,
  X,
} from "lucide-react";

import { MemoryCard } from "@/features/memory/components/MemoryCard";
import { mockMemories } from "@/features/memory/data/mockMemories";

import type {
  Memory,
  MemoryCategory,
} from "@/features/memory/types/memory";

import styles from "./page.module.css";

type Filter =
  | "all"
  | MemoryCategory;

export default function MemoryPage() {
  const [memories, setMemories] =
    useState<Memory[]>(mockMemories);

  const [query, setQuery] =
    useState("");

  const [filter, setFilter] =
    useState<Filter>("all");

  const [editingMemory, setEditingMemory] =
    useState<Memory | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const filteredMemories = useMemo(() => {
    const normalized =
      query.toLowerCase().trim();

    return memories.filter((memory) => {
      const matchesFilter =
        filter === "all" ||
        memory.category === filter;

      if (!matchesFilter) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      return (
        memory.content
          .toLowerCase()
          .includes(normalized) ||
        memory.category
          .toLowerCase()
          .includes(normalized)
      );
    });
  }, [memories, query, filter]);

  function forgetMemory(id: string) {
    setMemories((current) =>
      current.filter(
        (memory) => memory.id !== id,
      ),
    );
  }

  function saveMemory(
    content: string,
    category: MemoryCategory,
  ) {
    if (!content.trim()) {
      return;
    }

    if (editingMemory) {
      setMemories((current) =>
        current.map((memory) =>
          memory.id === editingMemory.id
            ? {
                ...memory,
                content: content.trim(),
                category,
                updatedAt:
                  new Date().toISOString(),
              }
            : memory,
        ),
      );
    } else {
      const now =
        new Date().toISOString();

      const memory: Memory = {
        id: `memory-${Date.now()}`,
        content: content.trim(),
        category,
        source: "Added manually",
        createdAt: now,
        updatedAt: now,
      };

      setMemories((current) => [
        memory,
        ...current,
      ]);
    }

    closeForm();
  }

  function openCreate() {
    setEditingMemory(null);
    setShowForm(true);
  }

  function openEdit(memory: Memory) {
    setEditingMemory(memory);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingMemory(null);
  }

  const filters: {
    id: Filter;
    label: string;
  }[] = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "preference",
      label: "Preferences",
    },
    {
      id: "goal",
      label: "Goals",
    },
    {
      id: "personal",
      label: "Personal",
    },
    {
      id: "context",
      label: "Context",
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            PERSONAL CONTEXT
          </p>

          <h1>Memory</h1>

          <p className={styles.description}>
            Things LifeOS remembers to make your
            experience more personal.
          </p>
        </div>

        <button
          type="button"
          className={styles.createButton}
          onClick={openCreate}
        >
          <Plus size={15} />
          Add memory
        </button>
      </header>

      <section className={styles.notice}>
        <div className={styles.noticeIcon}>
          <Brain size={17} />
        </div>

        <div>
          <strong>
            Your memory, your control.
          </strong>

          <p>
            LifeOS will only use memories that
            you allow it to remember. You can
            edit or forget anything at any time.
          </p>
        </div>
      </section>

      <div className={styles.search}>
        <Search size={15} />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search memories..."
        />
      </div>

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

      <section>
        <div className={styles.sectionHeader}>
          <h2>
            Memories
          </h2>

          <span>
            {filteredMemories.length} memories
          </span>
        </div>

        {filteredMemories.length > 0 ? (
          <div className={styles.list}>
            {filteredMemories.map(
              (memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onEdit={openEdit}
                  onForget={forgetMemory}
                />
              ),
            )}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>
              No memories found
            </h3>

            <p>
              Try another search or category.
            </p>
          </div>
        )}
      </section>

      {showForm && (
        <MemoryModal
          memory={editingMemory}
          onSave={saveMemory}
          onClose={closeForm}
        />
      )}
    </main>
  );
}

interface MemoryModalProps {
  memory: Memory | null;

  onSave: (
    content: string,
    category: MemoryCategory,
  ) => void;

  onClose: () => void;
}

function MemoryModal({
  memory,
  onSave,
  onClose,
}: MemoryModalProps) {
  const [content, setContent] =
    useState(memory?.content ?? "");

  const [category, setCategory] =
    useState<MemoryCategory>(
      memory?.category ?? "context",
    );

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    onSave(content, category);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <div>
            <p>
              {memory ? "UPDATE" : "NEW MEMORY"}
            </p>

            <h2>
              {memory
                ? "Edit memory"
                : "Add memory"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </header>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="memory-content">
              What should LifeOS remember?
            </label>

            <textarea
              id="memory-content"
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              placeholder="Example: I prefer working in the morning."
              rows={4}
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="memory-category">
              Category
            </label>

            <select
              id="memory-category"
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value as MemoryCategory,
                )
              }
            >
              <option value="preference">
                Preference
              </option>

              <option value="goal">
                Goal
              </option>

              <option value="personal">
                Personal
              </option>

              <option value="context">
                Context
              </option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.save}
            >
              {memory
                ? "Save changes"
                : "Remember this"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}