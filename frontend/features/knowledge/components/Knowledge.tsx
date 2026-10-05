"use client";

import { useMemo, useState } from "react";
import {
  FileUp,
  Search,
} from "lucide-react";

import { KnowledgeCard } from "@/features/knowledge/components/KnowledgeCard";
import { mockKnowledge } from "@/features/knowledge/data/mockKnowledge";

import type { KnowledgeType } from "@/features/knowledge/types/knowledge";

import styles from "./Knowledge.module.css";

type Filter =
  | "all"
  | KnowledgeType;

export default function KnowledgePage() {
  const [query, setQuery] =
    useState("");

  const [filter, setFilter] =
    useState<Filter>("all");

  const filteredItems = useMemo(() => {
    const normalizedQuery =
      query.toLowerCase().trim();

    return mockKnowledge.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        item.type === filter;

      if (!matchesFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        item.title
          .toLowerCase()
          .includes(normalizedQuery) ||
        item.description
          .toLowerCase()
          .includes(normalizedQuery) ||
        item.tags.some((tag) =>
          tag
            .toLowerCase()
            .includes(normalizedQuery),
        )
      );
    });
  }, [query, filter]);

  const filters: {
    id: Filter;
    label: string;
  }[] = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "document",
      label: "Documents",
    },
    {
      id: "note",
      label: "Notes",
    },
    {
      id: "research",
      label: "Research",
    },
    {
      id: "conversation",
      label: "Conversations",
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            KNOWLEDGE
          </p>

          <h1>Knowledge</h1>

          <p className={styles.description}>
            Everything LifeOS can use to
            understand your context.
          </p>
        </div>

        <button
          type="button"
          className={styles.uploadButton}
        >
          <FileUp size={15} />
          Add knowledge
        </button>
      </header>

      <div className={styles.search}>
        <Search size={15} />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search your knowledge..."
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

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent</h2>

          <span>
            {filteredItems.length} items
          </span>
        </div>

        {filteredItems.length > 0 ? (
          <div className={styles.list}>
            {filteredItems.map((item) => (
              <KnowledgeCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>
              No knowledge found
            </h3>

            <p>
              Try a different search or
              category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}