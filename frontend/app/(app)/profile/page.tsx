"use client";

import {
  CalendarDays,
  LogOut,
  Mail,
  User,
} from "lucide-react";

import { mockProfile } from "@/features/profile/data/mockProfile";

import styles from "./page.module.css";

export default function ProfilePage() {
  const profile = mockProfile;

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          ACCOUNT
        </p>

        <h1>Profile</h1>

        <p>
          Manage your LifeOS identity and
          account information.
        </p>
      </header>

      <section className={styles.profileCard}>
        <div className={styles.avatar}>
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
            />
          ) : (
            initials
          )}
        </div>

        <div className={styles.identity}>
          <h2>{profile.name}</h2>

          <p>{profile.role}</p>
        </div>
      </section>

      <section className={styles.infoCard}>
        <div className={styles.infoRow}>
          <div className={styles.icon}>
            <User size={15} />
          </div>

          <div>
            <span>Name</span>
            <strong>{profile.name}</strong>
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.icon}>
            <Mail size={15} />
          </div>

          <div>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.icon}>
            <CalendarDays size={15} />
          </div>

          <div>
            <span>Member since</span>

            <strong>
              {new Date(
                profile.joinedAt,
              ).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </strong>
          </div>
        </div>
      </section>

      <section className={styles.accountActions}>
        <button type="button">
          <LogOut size={14} />
          Sign out
        </button>
      </section>
    </main>
  );
}