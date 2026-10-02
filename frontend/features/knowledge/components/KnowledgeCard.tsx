"use client";

import {
  FileText,
  MessageSquare,
  Search,
  StickyNote,
} from "lucide-react";

import type { KnowledgeItem } from "../types/knowledge";

import styles from "./KnowledgeCard.module.css";

interface KnowledgeCardProps {
  item: KnowledgeItem;
}

const icons = {
  document: FileText,
  note: StickyNote,
  research: Search,
  conversation: MessageSquare,
};

export function KnowledgeCard({
  item,
}: KnowledgeCardProps) {
  const Icon = icons[item.type];

  return (
    <article className={styles.card}>
      <div className={styles.icon}>
        <Icon size={17} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{item.title}</h3>

          <span className={styles.type}>
            {item.type}
          </span>
        </div>

        <p>{item.description}</p>

        <div className={styles.footer}>
          <span>{item.source}</span>

          {item.size && (
            <span>{item.size}</span>
          )}

          <span>
            {new Date(
              item.updatedAt,
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className={styles.tags}>
          {item.tags.map((tag) => (
            <span key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}