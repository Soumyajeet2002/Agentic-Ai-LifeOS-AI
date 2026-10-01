"use client";

import {
  CalendarDays,
  CheckCircle2,
  Target,
  Sparkles,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { AIInput } from "@/components/ui/AIInput";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  Stagger,
  StaggerItem,
} from "@/components/motion/Stagger";

import styles from "./page.module.css";

const summary = [
  {
    label: "Today's Tasks",
    value: "5",
    description: "2 remaining",
    icon: CheckCircle2,
  },
  {
    label: "Upcoming",
    value: "3",
    description: "events today",
    icon: CalendarDays,
  },
  {
    label: "Goals",
    value: "2",
    description: "active goals",
    icon: Target,
  },
  {
    label: "AI Insights",
    value: "3",
    description: "new suggestions",
    icon: Sparkles,
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className={styles.page}>
        <FadeIn>
          <section className={styles.hero}>
            <div>
              <p className={styles.eyebrow}>
                PERSONAL AGENTIC AI
              </p>

              <h1>
                Good morning, Alex{" "}
                <span>👋</span>
              </h1>

              <p className={styles.subtitle}>
                Here&apos;s what&apos;s happening
                and what LifeOS has planned for you.
              </p>
            </div>

            <div className={styles.aiBadge}>
              <span />
              LifeOS is ready
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.08}>
          <section className={styles.aiSection}>
            <AIInput
              onSubmit={(value) => {
                console.log(
                  "LifeOS request:",
                  value,
                );
              }}
            />

            <p className={styles.aiHint}>
              Try: &quot;Plan my week&quot; or
              &quot;Help me prepare for my interview&quot;
            </p>
          </section>
        </FadeIn>

        <Stagger>
          <section className={styles.summaryGrid}>
            {summary.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem key={item.label}>
                  <Card
                    className={
                      styles.summaryCard
                    }
                    interactive
                  >
                    <div
                      className={
                        styles.summaryIcon
                      }
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <p>
                        {item.label}
                      </p>

                      <strong>
                        {item.value}
                      </strong>

                      <span>
                        {item.description}
                      </span>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </section>
        </Stagger>

        <section className={styles.contentGrid}>
          <FadeIn delay={0.2}>
            <Card className={styles.goalCard}>
              <div
                className={styles.cardHeader}
              >
                <div>
                  <p className={styles.cardLabel}>
                    ACTIVE GOAL
                  </p>

                  <h2>
                    Become job-ready in Python
                  </h2>
                </div>

                <Target size={20} />
              </div>

              <div
                className={styles.goalProgress}
              >
                <div>
                  <strong>62%</strong>
                  <span>
                    12 tasks remaining
                  </span>
                </div>

                <Progress value={62} />
              </div>

              <div
                className={styles.nextAction}
              >
                <span>Next action</span>

                <strong>
                  Complete Python OOP module
                </strong>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.28}>
            <Card className={styles.activityCard}>
              <div
                className={styles.cardHeader}
              >
                <div>
                  <p className={styles.cardLabel}>
                    AI ACTIVITY
                  </p>

                  <h2>
                    LifeOS is working
                  </h2>
                </div>

                <div
                  className={styles.pulse}
                />
              </div>

              <div
                className={styles.activity}
              >
                <div>
                  <CheckCircle2 size={16} />
                  Analyzed your goals
                </div>

                <div>
                  <CheckCircle2 size={16} />
                  Reviewed your calendar
                </div>

                <div className={styles.active}>
                  <Sparkles size={16} />
                  Preparing your next actions...
                </div>
              </div>
            </Card>
          </FadeIn>
        </section>
      </div>
    </AppShell>
  );
}