import {
    Check,
    Circle,
    Loader2,
  } from "lucide-react";
  
  import type {
    AgentStep,
  } from "../types/agent";
  
  import styles from "./AgentPlan.module.css";
  
  interface AgentPlanProps {
    steps: AgentStep[];
  }
  
  export function AgentPlan({
    steps,
  }: AgentPlanProps) {
    return (
      <section className={styles.card}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>EXECUTION PLAN</p>
  
            <h2>Agent Plan</h2>
          </div>
  
          <span className={styles.count}>
            {steps.filter(
              (step) => step.status === "completed",
            ).length}
            /{steps.length}
          </span>
        </div>
  
        <div className={styles.steps}>
          {steps
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <div
                key={step.id}
                className={styles.step}
              >
                <div className={styles.indicator}>
                  {step.status === "completed" && (
                    <span className={styles.completed}>
                      <Check size={13} />
                    </span>
                  )}
  
                  {step.status === "in_progress" && (
                    <span className={styles.progress}>
                      <Loader2 size={14} />
                    </span>
                  )}
  
                  {step.status === "pending" && (
                    <Circle size={13} />
                  )}
                </div>
  
                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <span className={styles.title}>
                      {step.title}
                    </span>
  
                    {step.requiresApproval && (
                      <span className={styles.approval}>
                        Approval
                      </span>
                    )}
                  </div>
  
                  {step.description && (
                    <p>{step.description}</p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    );
  }