"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import { EventCard } from "@/features/calendar/components/EventCard";
import { mockEvents } from "@/features/calendar/data/mockEvents";

import styles from "./page.module.css";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] =
    useState("2026-10-03");

  const selectedEvents = useMemo(
    () =>
      mockEvents.filter(
        (event) =>
          event.date === selectedDate,
      ),
    [selectedDate],
  );

  const selectedDateObject =
    new Date(`${selectedDate}T00:00:00`);

  const formattedDate =
    selectedDateObject.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      },
    );

  function changeDay(days: number) {
    const next = new Date(selectedDateObject);

    next.setDate(
      next.getDate() + days,
    );

    setSelectedDate(
      next.toISOString().split("T")[0],
    );
  }

  function goToday() {
    setSelectedDate("2026-10-03");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            TIME
          </p>

          <h1>Calendar</h1>

          <p className={styles.description}>
            See how your time connects to your
            goals and tasks.
          </p>
        </div>

        <button
          type="button"
          className={styles.createButton}
        >
          <Plus size={15} />
          New event
        </button>
      </header>

      <section className={styles.toolbar}>
        <div className={styles.navigation}>
          <button
            type="button"
            onClick={() => changeDay(-1)}
            aria-label="Previous day"
          >
            <ChevronLeft size={15} />
          </button>

          <button
            type="button"
            className={styles.today}
            onClick={goToday}
          >
            Today
          </button>

          <button
            type="button"
            onClick={() => changeDay(1)}
            aria-label="Next day"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        <div className={styles.date}>
          {formattedDate}
        </div>
      </section>

      <section className={styles.schedule}>
        <div className={styles.scheduleHeader}>
          <h2>Schedule</h2>

          <span>
            {selectedEvents.length} events
          </span>
        </div>

        {selectedEvents.length > 0 ? (
          <div className={styles.events}>
            {selectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>No events scheduled</h3>

            <p>
              Your day is currently open.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}