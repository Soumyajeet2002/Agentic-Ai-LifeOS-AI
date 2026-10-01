"use client";

import {
  Bell,
  Command,
} from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <button
        className={styles.command}
        aria-label="Open command palette"
      >
        <Command size={16} />
        <span>Search LifeOS...</span>
        <kbd>⌘ K</kbd>
      </button>

      <div className={styles.actions}>
        <button
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <Avatar name="Alex Carter" />
      </div>
    </header>
  );
}