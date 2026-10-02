"use client";

import styles from "./SettingsToggle.module.css";

interface SettingsToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingsToggle({
  label,
  description,
  checked,
  onChange,
}: SettingsToggleProps) {
  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <span className={styles.label}>
          {label}
        </span>

        <span className={styles.description}>
          {description}
        </span>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`${styles.toggle} ${
          checked ? styles.checked : ""
        }`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.knob} />
      </button>
    </div>
  );
}