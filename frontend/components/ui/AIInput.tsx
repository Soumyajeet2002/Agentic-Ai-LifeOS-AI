"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  ArrowUp,
  Sparkles,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "motion/react";

import styles from "./AIInput.module.css";

interface AIInputProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

const suggestions = [
  "Plan my week",
  "Prepare for my interview",
  "Organize my tasks",
];

export function AIInput({
  onSubmit,
  placeholder = "Tell LifeOS what you want to accomplish...",
}: AIInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) return;

    onSubmit?.(trimmed);
    setValue("");
  }

  function handleSuggestion(
    suggestion: string,
  ) {
    setValue(suggestion);
  }

  return (
    <div className={styles.container}>
      <motion.form
        className={styles.wrapper}
        onSubmit={handleSubmit}
        animate={{
          scale: focused ? 1.005 : 1,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <div className={styles.aiIcon}>
          <motion.div
            animate={{
              rotate: focused ? 180 : 0,
              scale: focused ? 1.05 : 1,
            }}
            transition={{
              duration: 0.45,
              ease: [0.2, 0, 0, 1],
            }}
          >
            <Sparkles size={18} />
          </motion.div>
        </div>

        <input
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={styles.input}
          autoComplete="off"
        />

        <motion.button
          type="submit"
          className={styles.submit}
          disabled={!value.trim()}
          whileHover={
            value.trim()
              ? {
                  scale: 1.06,
                }
              : undefined
          }
          whileTap={
            value.trim()
              ? {
                  scale: 0.94,
                }
              : undefined
          }
        >
          <ArrowUp size={18} />
        </motion.button>

        <AnimatePresence>
          {focused && (
            <motion.div
              className={styles.focusGlow}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
      </motion.form>

      <div className={styles.suggestions}>
        <span className={styles.suggestionLabel}>
          Try
        </span>

        {suggestions.map((suggestion) => (
          <motion.button
            key={suggestion}
            type="button"
            className={styles.suggestion}
            onClick={() =>
              handleSuggestion(suggestion)
            }
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
}