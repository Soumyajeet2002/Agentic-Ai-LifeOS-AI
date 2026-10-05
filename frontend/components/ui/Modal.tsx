"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

import styles from "./Modal.module.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: "default" | "settings";
}

export function Modal({
    open,
    onClose,
    title,
    children,
    size = "default",
}: ModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className={styles.overlay}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                className={`${styles.modal} ${
                    size === "settings"
                        ? styles.settingsModal
                        : ""
                }`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <header className={styles.header}>
                    <div className={styles.title}>
                        <span className={styles.titleIcon}>
                            ⚙
                        </span>

                        <span>{title}</span>
                    </div>

                    <button
                        type="button"
                        className={styles.close}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </header>

                <div className={styles.content}>
                    {children}
                </div>
            </section>
        </div>
    );
}