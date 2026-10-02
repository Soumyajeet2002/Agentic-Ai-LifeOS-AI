import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Circle,
} from "lucide-react";

import { mockGoals } from "@/features/goals/data/mockGoals";

import styles from "./page.module.css";

interface GoalDetailsPageProps {
  params: Promise<{
    goalId: string;
  }>;
}

export default async function GoalDetailsPage({
  params,
}: GoalDetailsPageProps) {
  const { goalId } = await params;

  const goal = mockGoals.find(
    (item) => item.id === goalId,
  );

  if (!goal) {
    return (
      <main className={styles.page}>
        <h1>Goal not found</h1>

        <Link href="/goals">
          Back to goals
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Link
        href="/goals"
        className={styles.back}
      >
        <ArrowLeft size={14} />
        Goals
      </Link>

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
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "No deadline"}
          </strong>
        </div>
      </header>

      <section className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <div>
            <span>Overall progress</span>
            <strong>{goal.progress}%</strong>
          </div>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{
              width: `${goal.progress}%`,
            }}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p>MILESTONES</p>
            <h2>Milestones</h2>
          </div>
        </div>

        <div className={styles.milestones}>
          {goal.milestones
            .sort((a, b) => a.order - b.order)
            .map((milestone) => (
              <div
                key={milestone.id}
                className={styles.milestone}
              >
                <div
                  className={
                    milestone.completed
                      ? styles.completedIcon
                      : styles.pendingIcon
                  }
                >
                  {milestone.completed ? (
                    <Check size={13} />
                  ) : (
                    <Circle size={12} />
                  )}
                </div>

                <span
                  className={
                    milestone.completed
                      ? styles.completedText
                      : ""
                  }
                >
                  {milestone.title}
                </span>
              </div>
            ))}
        </div>
      </section>

      <section className={styles.nextAction}>
        <p>NEXT ACTION</p>

        <h2>
          {goal.nextAction ?? "No next action"}
        </h2>
      </section>
    </main>
  );
}