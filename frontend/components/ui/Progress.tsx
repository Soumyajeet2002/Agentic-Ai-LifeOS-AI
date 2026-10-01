"use client";

import { motion } from "motion/react";
import styles from "./Progress.module.css";

interface ProgressProps {
  value: number;
}

export function Progress({ value }: ProgressProps) {
  const percentage = Math.min(
    100,
    Math.max(0, value),
  );

  return (
    <div className={styles.track}>
      <motion.div
        className={styles.bar}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
        }}
      />
    </div>
  );
}