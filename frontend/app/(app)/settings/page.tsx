"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Shield } from "lucide-react";

import { SettingsSection } from "@/features/settings/components/SettingsSection";
import { SettingsToggle } from "@/features/settings/components/SettingsToggle";
import { defaultSettings } from "@/features/settings/data/defaultSettings";

import type { UserSettings } from "@/features/settings/types/settings";

import styles from "./page.module.css";

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<UserSettings>(defaultSettings);

  function updateAI(
    key: keyof UserSettings["ai"],
    value: boolean,
  ) {
    setSettings((current) => ({
      ...current,
      ai: {
        ...current.ai,
        [key]: value,
      },
    }));
  }

  function updateNotifications(
    key: keyof UserSettings["notifications"],
    value: boolean,
  ) {
    setSettings((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: value,
      },
    }));
  }

  function updatePrivacy(
    key: keyof UserSettings["privacy"],
    value: boolean,
  ) {
    setSettings((current) => ({
      ...current,
      privacy: {
        ...current.privacy,
        [key]: value,
      },
    }));
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.titleIcon}>
          <SettingsIcon size={18} />
        </div>

        <div>
          <p className={styles.eyebrow}>
            PREFERENCES
          </p>

          <h1>Settings</h1>

          <p>
            Configure how LifeOS behaves and
            interacts with you.
          </p>
        </div>
      </header>

      <div className={styles.content}>
        <SettingsSection
          title="AI Preferences"
          description="Control how LifeOS assists you."
        >
          <SettingsToggle
            label="Proactive suggestions"
            description="Allow LifeOS to suggest useful actions based on your goals and context."
            checked={
              settings.ai.proactiveSuggestions
            }
            onChange={(value) =>
              updateAI(
                "proactiveSuggestions",
                value,
              )
            }
          />

          <SettingsToggle
            label="Ask before important actions"
            description="Require your approval before LifeOS performs sensitive actions."
            checked={
              settings.ai
                .askBeforeImportantActions
            }
            onChange={(value) =>
              updateAI(
                "askBeforeImportantActions",
                value,
              )
            }
          />

          <SettingsToggle
            label="Remember context"
            description="Allow LifeOS to use your saved memories when assisting you."
            checked={
              settings.ai.rememberContext
            }
            onChange={(value) =>
              updateAI(
                "rememberContext",
                value,
              )
            }
          />

          <SettingsToggle
            label="Show agent activity"
            description="Show what the AI is currently planning, executing, or waiting for."
            checked={
              settings.ai.showAgentActivity
            }
            onChange={(value) =>
              updateAI(
                "showAgentActivity",
                value,
              )
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Choose what LifeOS should notify you about."
        >
          <SettingsToggle
            label="Task reminders"
            description="Receive reminders for upcoming and overdue tasks."
            checked={
              settings.notifications
                .taskReminders
            }
            onChange={(value) =>
              updateNotifications(
                "taskReminders",
                value,
              )
            }
          />

          <SettingsToggle
            label="Goal updates"
            description="Get updates when important goal progress changes."
            checked={
              settings.notifications
                .goalUpdates
            }
            onChange={(value) =>
              updateNotifications(
                "goalUpdates",
                value,
              )
            }
          />

          <SettingsToggle
            label="AI suggestions"
            description="Receive notifications when LifeOS has a useful suggestion."
            checked={
              settings.notifications
                .aiSuggestions
            }
            onChange={(value) =>
              updateNotifications(
                "aiSuggestions",
                value,
              )
            }
          />

          <SettingsToggle
            label="Email notifications"
            description="Receive selected LifeOS notifications by email."
            checked={
              settings.notifications
                .emailNotifications
            }
            onChange={(value) =>
              updateNotifications(
                "emailNotifications",
                value,
              )
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Privacy & Memory"
          description="Control what LifeOS remembers and keeps."
        >
          <SettingsToggle
            label="Memory"
            description="Allow LifeOS to save useful personal context for future interactions."
            checked={
              settings.privacy.memoryEnabled
            }
            onChange={(value) =>
              updatePrivacy(
                "memoryEnabled",
                value,
              )
            }
          />

          <SettingsToggle
            label="Activity history"
            description="Keep a history of your interactions with LifeOS."
            checked={
              settings.privacy.activityHistory
            }
            onChange={(value) =>
              updatePrivacy(
                "activityHistory",
                value,
              )
            }
          />
        </SettingsSection>

        <section className={styles.privacyCard}>
          <div className={styles.privacyIcon}>
            <Shield size={17} />
          </div>

          <div>
            <strong>
              Your data stays under your control.
            </strong>

            <p>
              These settings will eventually be
              persisted by the LifeOS backend.
              For now, changes are stored only
              in the current frontend session.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}