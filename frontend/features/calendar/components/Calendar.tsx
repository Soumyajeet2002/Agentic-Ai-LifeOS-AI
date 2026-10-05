"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import { EventCard } from "@/features/calendar/components/EventCard";
import { mockEvents } from "@/features/calendar/data/mockEvents";

import styles from "./Calendar.module.css";

type CalendarDay = {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] =
    useState("2026-10-03");

  const [currentMonth, setCurrentMonth] =
    useState(new Date("2026-10-01T00:00:00"));

  /* =========================
     Selected day events
  ========================= */

  const selectedEvents = useMemo(
    () =>
      mockEvents.filter(
        (event) => event.date === selectedDate,
      ),
    [selectedDate],
  );

  /* =========================
     Calendar days
  ========================= */

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: CalendarDay[] = [];

    /*
     * Previous month's trailing days
     */
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(
        year,
        month,
        -i,
      );

      days.push({
        date,
        dateString: formatDate(date),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    /*
     * Current month
     */
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        year,
        month,
        day,
      );

      const dateString = formatDate(date);

      days.push({
        date,
        dateString,
        isCurrentMonth: true,
        isToday:
          dateString === "2026-10-03",
      });
    }

    /*
     * Next month's leading days
     *
     * Keep the calendar at 6 rows.
     */
    const remaining =
      42 - days.length;

    for (let day = 1; day <= remaining; day++) {
      const date = new Date(
        year,
        month + 1,
        day,
      );

      days.push({
        date,
        dateString: formatDate(date),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  }, [currentMonth]);

  /* =========================
     Month label
  ========================= */

  const monthLabel =
    currentMonth.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      },
    );

  /* =========================
     Navigation
  ========================= */

  function changeMonth(amount: number) {
    setCurrentMonth(
      (previous) =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() + amount,
          1,
        ),
    );
  }

  function goToday() {
    const today = new Date(
      "2026-10-03T00:00:00",
    );

    setCurrentMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ),
    );

    setSelectedDate(
      formatDate(today),
    );
  }

  function selectDate(day: CalendarDay) {
    setSelectedDate(day.dateString);

    setCurrentMonth(
      new Date(
        day.date.getFullYear(),
        day.date.getMonth(),
        1,
      ),
    );
  }

  function getEventsForDate(
    dateString: string,
  ) {
    return mockEvents.filter(
      (event) =>
        event.date === dateString,
    );
  }

  return (
    <main className={styles.page}>

      {/* =========================
          Header
      ========================= */}

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
          <Plus size={16} />
          New event
        </button>
      </header>

      {/* =========================
          Calendar Toolbar
      ========================= */}

      <section className={styles.toolbar}>

        <div className={styles.navigation}>

          <button
            type="button"
            onClick={() =>
              changeMonth(-1)
            }
            aria-label="Previous month"
          >
            <ChevronLeft size={17} />
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
            onClick={() =>
              changeMonth(1)
            }
            aria-label="Next month"
          >
            <ChevronRight size={17} />
          </button>

        </div>

        <div className={styles.monthLabel}>
          {monthLabel}
        </div>

      </section>

      {/* =========================
          Calendar
      ========================= */}

      <section className={styles.calendar}>

        {/* Weekday Header */}

        <div className={styles.weekDays}>
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div key={day}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}

        <div className={styles.calendarGrid}>

          {calendarDays.map((day) => {
            const events =
              getEventsForDate(
                day.dateString,
              );

            const isSelected =
              day.dateString ===
              selectedDate;

            return (
              <button
                type="button"
                key={day.dateString}
                className={[
                  styles.day,
                  !day.isCurrentMonth
                    ? styles.otherMonth
                    : "",
                  day.isToday
                    ? styles.todayDay
                    : "",
                  isSelected
                    ? styles.selectedDay
                    : "",
                ].join(" ")}
                onClick={() =>
                  selectDate(day)
                }
              >

                <span
                  className={
                    styles.dayNumber
                  }
                >
                  {day.date.getDate()}
                </span>

                <div
                  className={
                    styles.dayEvents
                  }
                >
                  {events
                    .slice(0, 3)
                    .map((event) => (
                      <div
                        key={event.id}
                        className={
                          styles.event
                        }
                      >
                        {event.title}
                      </div>
                    ))}

                  {events.length > 3 && (
                    <span
                      className={
                        styles.moreEvents
                      }
                    >
                      +{events.length - 3} more
                    </span>
                  )}
                </div>

              </button>
            );
          })}

        </div>
      </section>

      {/* =========================
          Selected Day
      ========================= */}

      <section className={styles.schedule}>

        <div
          className={
            styles.scheduleHeader
          }
        >
          <div>
            <p className={styles.sectionLabel}>
              SELECTED DAY
            </p>

            <h2>
              {formatReadableDate(
                selectedDate,
              )}
            </h2>
          </div>

          <span>
            {selectedEvents.length}{" "}
            {selectedEvents.length === 1
              ? "event"
              : "events"}
          </span>
        </div>

        {selectedEvents.length > 0 ? (
          <div className={styles.events}>
            {selectedEvents.map(
              (event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ),
            )}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>
              No events scheduled
            </h3>

            <p>
              Your selected day is
              currently open.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

/* =========================
   Helpers
========================= */

function formatDate(date: Date) {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatReadableDate(
  dateString: string,
) {
  const date = new Date(
    `${dateString}T00:00:00`,
  );

  return date.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
}