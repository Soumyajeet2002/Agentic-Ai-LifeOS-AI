"use client";

import {
  CalendarClock,
  Target,
} from "lucide-react";

import type { CalendarEvent } from "../types/event";

import styles from "./EventCard.module.css";

interface EventCardProps {
  event: CalendarEvent;
}

export function EventCard({
  event,
}: EventCardProps) {
  return (
    <article
      className={`${styles.card} ${styles[event.type]}`}
    >
      <div className={styles.time}>
        <span>{event.startTime}</span>
        <span>{event.endTime}</span>
      </div>

      <div className={styles.content}>
        <h3>{event.title}</h3>

        {event.description && (
          <p>{event.description}</p>
        )}

        <div className={styles.meta}>
          {event.goalId && (
            <span>
              <Target size={11} />
              Goal
            </span>
          )}

          <span>
            <CalendarClock size={11} />
            {event.type}
          </span>
        </div>
      </div>
    </article>
  );
}