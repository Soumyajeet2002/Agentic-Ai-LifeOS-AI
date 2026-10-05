"use client";

import {
    ArrowLeft,
    CalendarDays,
    Check,
    Circle,
} from "lucide-react";

import { mockGoals } from "@/features/goals/data/mockGoals";

import { useWorkspaceStore } from "@/stores/workspaceStore";

import styles from "./GoalWorkspace.module.css";

export function GoalWorkspace() {
    const {
        activeGoalId,
        setActiveGoal,
        setWorkspace,
    } = useWorkspaceStore();

    const goal = mockGoals.find(
        (item) => item.id === activeGoalId,
    );

    if (!goal) {
        return (
            <main className={styles.page}>
                <h1>No goal selected</h1>

                <button
                    type="button"
                    onClick={() =>
                        setWorkspace("goals")
                    }
                >
                    Back to goals
                </button>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <button
                type="button"
                className={styles.back}
                onClick={() => {
                    setActiveGoal(null);
                    setWorkspace("goals");
                }}
            >
                <ArrowLeft size={14} />
                Goals
            </button>

            <header className={styles.header}>
                <div>
                    <span className={styles.status}>
                        {goal.status}
                    </span>

                    <h1>{goal.title}</h1>

                    <p>{goal.description}</p>
                </div>

                <div className={styles.deadline}>
                    <CalendarDays size={14} />

                    <span>Deadline</span>

                    <strong>
                        {goal.deadline
                            ? new Date(
                                  goal.deadline,
                              ).toLocaleDateString(
                                  "en-US",
                                  {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                  },
                              )
                            : "No deadline"}
                    </strong>
                </div>
            </header>

            <section
                className={
                    styles.progressCard
                }
            >
                <div
                    className={
                        styles.progressHeader
                    }
                >
                    <div>
                        <span>
                            Overall progress
                        </span>

                        <strong>
                            {goal.progress}%
                        </strong>
                    </div>
                </div>

                <div
                    className={
                        styles.progressTrack
                    }
                >
                    <div
                        className={
                            styles.progressBar
                        }
                        style={{
                            width: `${goal.progress}%`,
                        }}
                    />
                </div>
            </section>

            <section className={styles.section}>
                <div
                    className={
                        styles.sectionHeader
                    }
                >
                    <div>
                        <p>MILESTONES</p>
                        <h2>Milestones</h2>
                    </div>
                </div>

                <div
                    className={
                        styles.milestones
                    }
                >
                    {[...goal.milestones]
                        .sort(
                            (a, b) =>
                                a.order - b.order,
                        )
                        .map((milestone) => (
                            <div
                                key={
                                    milestone.id
                                }
                                className={
                                    styles.milestone
                                }
                            >
                                <div
                                    className={
                                        milestone.completed
                                            ? styles.completedIcon
                                            : styles.pendingIcon
                                    }
                                >
                                    {milestone.completed ? (
                                        <Check
                                            size={
                                                13
                                            }
                                        />
                                    ) : (
                                        <Circle
                                            size={
                                                12
                                            }
                                        />
                                    )}
                                </div>

                                <span
                                    className={
                                        milestone.completed
                                            ? styles.completedText
                                            : ""
                                    }
                                >
                                    {
                                        milestone.title
                                    }
                                </span>
                            </div>
                        ))}
                </div>
            </section>

            <section
                className={
                    styles.nextAction
                }
            >
                <p>NEXT ACTION</p>

                <h2>
                    {goal.nextAction ??
                        "No next action"}
                </h2>
            </section>
        </main>
    );
}