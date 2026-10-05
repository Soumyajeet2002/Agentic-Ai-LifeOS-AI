"use client";

import { CalendarDays, CheckCircle2, Target, Sparkles } from "lucide-react";

// import { AppShell } from "@/components/layout/AppShell";
import { AIInput } from "@/components/ui/AIInput";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

import styles from "./Dashboard.module.css";

const summary = [
  {
    label: "Today's Tasks",
    value: "5",
    detail: "2 remaining",
    action: "View tasks",
    icon: CheckCircle2,
  },
  {
    label: "Upcoming",
    value: "3",
    detail: "Next: Team meeting",
    action: "View calendar",
    icon: CalendarDays,
  },
  {
    label: "Goals",
    value: "2",
    detail: "62% average progress",
    action: "View goals",
    icon: Target,
  },
  {
    label: "AI Insights",
    value: "3",
    detail: "1 needs your attention",
    action: "Review insights",
    icon: Sparkles,
  },
];

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <FadeIn>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />

          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              YOUR PERSONAL AI
            </div>

            <h1>
              Good morning, Alex
              <span className={styles.wave}>👋</span>
            </h1>

            <p className={styles.subtitle}>
              What would you like to accomplish today?
            </p>
          </div>

          <div className={styles.aiStatus}>
            <span className={styles.statusPulse} />
            LifeOS is ready
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className={styles.aiSection}>
          <AIInput
            onSubmit={(value) => {
              console.log("LifeOS request:", value);
            }}
          />

          <p className={styles.aiHint}>
            Try: &quot;Plan my week&quot; or &quot;Help me prepare for my
            interview&quot;
          </p>
        </section>
      </FadeIn>

      <Stagger>
        <section className={styles.summaryGrid}>
          {summary.map((item) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.label}>
                <Card className={styles.summaryCard} interactive>
                  <div className={styles.summaryIcon}>
                    <Icon size={18} />
                  </div>

                  <div>
                    <p>{item.label}</p>

                    <strong>{item.value}</strong>

                    <span>
                      {/* {item.description} */}
                      {item.detail}
                    </span>
                    <small>{item.action}</small>
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
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardLabel}>ACTIVE GOAL</p>

                <h2>Become job-ready in Python</h2>
              </div>

              <Target size={20} />
            </div>

            <div className={styles.goalProgress}>
              <div>
                <strong>62%</strong>
                <span>12 tasks remaining</span>
              </div>

              <Progress value={62} />
            </div>

            <div className={styles.nextAction}>
              <span>Next action</span>

              <strong>Complete Python OOP module</strong>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.28}>
          <Card className={styles.activityCard}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardLabel}>AI ACTIVITY</p>

                <h2>LifeOS is working</h2>
              </div>

              <div className={styles.pulse} />
            </div>

            <div className={styles.activity}>
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
  );
}
