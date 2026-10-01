"use client";

import { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "@/components/navigation/Sidebar";

import styles from "./AppShell.module.css";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <Sidebar />

      <div className={styles.main}>
        <Header />

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}