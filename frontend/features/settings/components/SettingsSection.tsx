import type { ReactNode } from "react";

import styles from "./SettingsSection.module.css";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}