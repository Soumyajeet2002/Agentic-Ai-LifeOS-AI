import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import type { Goal } from "../types/goal";

import styles from "./GoalCard.module.css";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const completedMilestones = goal.milestones.filter(
    (milestone) => milestone.completed,
  ).length;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.status}>
          {goal.status}
        </span>

        <Link
          href={`/goals/${goal.id}`}
          className={styles.open}
          aria-label={`Open ${goal.title}`}
        >
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <h3>{goal.title}</h3>

      <p className={styles.description}>
        {goal.description}
      </p>

      <div className={styles.progressHeader}>
        <span>Progress</span>
        <strong>{goal.progress}%</strong>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{
            width: `${goal.progress}%`,
          }}
        />
      </div>

      <div className={styles.meta}>
        <span>
          {completedMilestones}/
          {goal.milestones.length} milestones
        </span>

        {goal.deadline && (
          <span className={styles.deadline}>
            <CalendarDays size={12} />
            {new Date(goal.deadline).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              },
            )}
          </span>
        )}
      </div>

      {goal.nextAction && (
        <div className={styles.nextAction}>
          <span>Next action</span>
          <strong>{goal.nextAction}</strong>
        </div>
      )}
    </article>
  );
}