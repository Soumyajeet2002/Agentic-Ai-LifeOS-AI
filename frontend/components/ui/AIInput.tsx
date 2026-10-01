"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import styles from "./AIInput.module.css";

interface AIInputProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export function AIInput({
  onSubmit,
  placeholder = "Tell me what you want to accomplish...",
}: AIInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) return;

    onSubmit?.(trimmed);
    setValue("");
  }

  return (
    <form
      className={styles.wrapper}
      onSubmit={handleSubmit}
    >
      <div className={styles.icon}>
        <Sparkles size={18} />
      </div>

      <input
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        placeholder={placeholder}
        className={styles.input}
      />

      <motion.button
        type="submit"
        className={styles.submit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!value.trim()}
      >
        <ArrowUp size={18} />
      </motion.button>
    </form>
  );
}