"use client";
import { Sidebar } from "./Sidebar";

import { WorkspaceRenderer } from "./WorkspaceRenderer";
import { SettingsModal } from "../modals/SettingsModal";
import { ProfileModal } from "../modals/ProfileModal";

import styles from "./AppShell.module.css";

export function AppShell() {
  return (
      <div className={styles.shell}>
          <Sidebar />

          <main className={styles.workspace}>
              <WorkspaceRenderer />
          </main>

          <SettingsModal />
          <ProfileModal />
      </div>
  );
}