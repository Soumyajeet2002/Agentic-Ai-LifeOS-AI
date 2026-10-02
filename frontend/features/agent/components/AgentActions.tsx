"use client";
import {
    Check,
    Circle,
    Loader2,
    ShieldAlert,
} from "lucide-react";

import type {
    AgentAction,
} from "../types/agent";

import styles from "./AgentActions.module.css";

interface AgentActionsProps {
    actions: AgentAction[];
    onReview?: (action: AgentAction) => void;
}

export function AgentActions({
    actions,
    onReview,
}: AgentActionsProps) {
    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>EXECUTION</p>

                    <h2>Agent Actions</h2>
                </div>

                <span className={styles.count}>
                    {actions.length} actions
                </span>
            </div>

            <div className={styles.list}>
                {actions.map((action) => {
                    const isCompleted =
                        action.status === "completed";

                    const isInProgress =
                        action.status === "in_progress";

                    // const requiresApproval =
                    //     action.requiresApproval;
                    const requiresApproval =
                        action.requiresApproval &&
                        action.status === "pending";

                    return (
                        <div
                            key={action.id}
                            className={styles.action}
                        >
                            <div className={styles.statusIcon}>
                                {isCompleted && (
                                    <span className={styles.completed}>
                                        <Check size={13} />
                                    </span>
                                )}

                                {isInProgress && (
                                    <span className={styles.inProgress}>
                                        <Loader2 size={14} />
                                    </span>
                                )}

                                {!isCompleted &&
                                    !isInProgress &&
                                    !requiresApproval && (
                                        <Circle size={14} />
                                    )}

                                {requiresApproval && (
                                    <span className={styles.approvalIcon}>
                                        <ShieldAlert size={13} />
                                    </span>
                                )}
                            </div>

                            <div className={styles.content}>
                                <div className={styles.titleRow}>
                                    <span className={styles.title}>
                                        {action.title}
                                    </span>

                                    {requiresApproval && (
                                        <span className={styles.approvalBadge}>
                                            Approval required
                                        </span>
                                    )}
                                </div>

                                {action.description && (
                                    <p>{action.description}</p>
                                )}

                                {action.tool && (
                                    <span className={styles.tool}>
                                        {action.tool}
                                    </span>
                                )}
                            </div>

                            {requiresApproval && (
                                <button
                                    type="button"
                                    className={styles.reviewButton}
                                    onClick={() => onReview?.(action)}
                                >
                                    Review
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}