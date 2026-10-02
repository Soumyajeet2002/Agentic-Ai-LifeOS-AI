"use client";
import Link from "next/link";
import { ArrowLeft, Clock3, Sparkles } from "lucide-react";

import { mockAgentSession } from "@/features/agent/data/mockAgent";
import { AgentPlan } from "@/features/agent/components/AgentPlan";
import { AgentActivity } from "@/features/agent/components/AgentActivity";
import { AgentActions } from "@/features/agent/components/AgentActions";
import type { AgentAction } from "@/features/agent/types/agent";
import { ApprovalDialog } from "@/features/agent/components/ApprovalDialog";


import styles from "./page.module.css";
import { useState } from "react";

import { useAgentSession } from "@/features/agent/hooks/useAgentSession";

export default function AgentPage() {
    const {
        session,
        reviewAction,
        approveAction,
        cancelAction,
    } = useAgentSession();

    const { goal, status } = session;

    const [selectedAction, setSelectedAction] =
        useState<AgentAction | null>(null);

    return (
        <main className={styles.page}>
            <Link href="/dashboard" className={styles.backLink}>
                <ArrowLeft size={15} />
                <span>Back to dashboard</span>
            </Link>

            <header className={styles.header}>
                <div>
                    <div className={styles.eyebrow}>
                        <Sparkles size={13} />
                        LIFEOS AGENT
                    </div>

                    <h1>Agent Workspace</h1>

                    <p className={styles.description}>
                        Review what LifeOS understands, plans, and is
                        currently working on.
                    </p>
                </div>

                <div className={styles.status}>
                    <span className={styles.statusDot} />
                    <span>
                        {status === "waiting_approval"
                            ? "Waiting for approval"
                            : status}
                    </span>
                </div>
            </header>

            <section className={styles.goalCard}>
                <div className={styles.goalHeader}>
                    <div>
                        <p className={styles.sectionLabel}>Current goal</p>

                        <h2>{goal.title}</h2>

                        {goal.description && (
                            <p className={styles.goalDescription}>
                                {goal.description}
                            </p>
                        )}
                    </div>
                </div>

                {goal.deadline && (
                    <div className={styles.deadline}>
                        <Clock3 size={15} />

                        <div>
                            <span>Deadline</span>

                            <strong>
                                {new Date(goal.deadline).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    },
                                )}
                            </strong>
                        </div>
                    </div>
                )}
            </section>

            {/* <section className={styles.workspace}>
                <div className={styles.grid}>
                    <AgentPlan steps={mockAgentSession.steps} />

                    <AgentActivity
                        activities={mockAgentSession.activities}
                    />
                </div>
            </section> */}
            <section className={styles.workspace}>
                <div className={styles.grid}>
                    <AgentPlan steps={mockAgentSession.steps} />

                    <AgentActivity
                        activities={mockAgentSession.activities}
                    />
                </div>

                <div className={styles.actions}>
                    <AgentActions
                        actions={session.actions}
                        onReview={(action) => {
                            reviewAction(action);
                            setSelectedAction(action);
                        }}
                    />
                </div>
            </section>

            <ApprovalDialog
                action={selectedAction}
                open={selectedAction !== null}
                onCancel={() => {
                    if (selectedAction) {
                      cancelAction(selectedAction);
                    }
                  
                    setSelectedAction(null);
                  }}
                  
                  onEdit={(action) => {
                    console.log("Edit action:", action);
                  }}
                  
                  onApprove={(action) => {
                    approveAction(action);
                    setSelectedAction(null);
                  }}
            />
        </main>

    );
}