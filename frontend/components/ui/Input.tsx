"use client";

import {
  InputHTMLAttributes,
  forwardRef,
} from "react";

import styles from "./Input.module.css";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input(props, ref) {
  return (
    <input
      ref={ref}
      className={styles.input}
      {...props}
    />
  );
});