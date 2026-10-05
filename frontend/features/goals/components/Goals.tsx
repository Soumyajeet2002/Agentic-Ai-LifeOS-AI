"use client";

import { useState } from "react";

import { Plus, X } from "lucide-react";

import { GoalCard } from "@/features/goals/components/GoalCard";
import { GoalForm } from "@/features/goals/components/GoalForm";
import { useGoals } from "@/features/goals/hooks/useGoals";

import { useWorkspaceStore } from "@/stores/workspaceStore";

import styles from "./Goals.module.css";

export default function GoalsPage() {
    const {
        goals,
        createGoal,
    } = useGoals();

    const {
        setActiveGoal,
        setWorkspace,
    } = useWorkspaceStore();

    const [formOpen, setFormOpen] =
        useState(false);

    const activeGoals = goals.filter(
        (goal) => goal.status === "active",
    );

    function handleCreateGoal(data: {
        title: string;
        description: string;
        deadline: string;
    }) {
        createGoal(data);

        setFormOpen(false);
    }

    function handleOpenGoal(
        goalId: string,
    ) {
        setActiveGoal(goalId);
        setWorkspace("goals");
    }

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>
                        YOUR DIRECTION
                    </p>

                    <h1>Goals</h1>

                    <p
                        className={
                            styles.description
                        }
                    >
                        Keep track of what you're
                        working toward and what needs
                        to happen next.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.createButton}
                    onClick={() =>
                        setFormOpen(true)
                    }
                >
                    <Plus size={15} />
                    New goal
                </button>
            </header>

            {formOpen && (
                <div
                    className={
                        styles.formOverlay
                    }
                >
                    <div
                        className={
                            styles.formModal
                        }
                    >
                        <div
                            className={
                                styles.formHeader
                            }
                        >
                            <div>
                                <p>CREATE</p>

                                <h2>
                                    New goal
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setFormOpen(
                                        false,
                                    )
                                }
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <GoalForm
                            onSubmit={
                                handleCreateGoal
                            }
                            onCancel={() =>
                                setFormOpen(
                                    false,
                                )
                            }
                        />
                    </div>
                </div>
            )}

            <section className={styles.section}>
                <div
                    className={
                        styles.sectionHeader
                    }
                >
                    <div>
                        <p
                            className={
                                styles.sectionLabel
                            }
                        >
                            ACTIVE
                        </p>

                        <h2>
                            Active goals
                        </h2>
                    </div>

                    <span
                        className={styles.count}
                    >
                        {activeGoals.length} goals
                    </span>
                </div>

                {activeGoals.length > 0 ? (
                    <div
                        className={
                            styles.goalGrid
                        }
                    >
                        {activeGoals.map(
                            (goal) => (
                                <div
                                    key={goal.id}
                                    onClick={() =>
                                        handleOpenGoal(
                                            goal.id,
                                        )
                                    }
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(
                                        event,
                                    ) => {
                                        if (
                                            event.key ===
                                            "Enter"
                                        ) {
                                            handleOpenGoal(
                                                goal.id,
                                            );
                                        }
                                    }}
                                >
                                    <GoalCard
                                        goal={goal}
                                    />
                                </div>
                            ),
                        )}
                    </div>
                ) : (
                    <div
                        className={
                            styles.emptyState
                        }
                    >
                        <div
                            className={
                                styles.emptyIcon
                            }
                        >
                            +
                        </div>

                        <h3>
                            No goals yet
                        </h3>

                        <p>
                            Create your first goal
                            and start turning an
                            intention into action.
                        </p>

                        <button
                            type="button"
                            className={
                                styles.emptyButton
                            }
                            onClick={() =>
                                setFormOpen(true)
                            }
                        >
                            Create your first goal
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}