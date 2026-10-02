import {
    Check,
    Info,
    AlertTriangle,
    XCircle,
  } from "lucide-react";
  
  import type {
    AgentActivity as AgentActivityItem,
  } from "../types/agent";
  
  import styles from "./AgentActivity.module.css";
  
  interface AgentActivityProps {
    activities: AgentActivityItem[];
  }
  
  export function AgentActivity({
    activities,
  }: AgentActivityProps) {
    return (
      <section className={styles.card}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>ACTIVITY</p>
  
            <h2>Agent Activity</h2>
          </div>
  
          <span className={styles.live}>
            <span />
            Live
          </span>
        </div>
  
        <div className={styles.list}>
          {activities.map((activity) => {
            const Icon =
              activity.status === "success"
                ? Check
                : activity.status === "warning"
                  ? AlertTriangle
                  : activity.status === "error"
                    ? XCircle
                    : Info;
  
            return (
              <div
                key={activity.id}
                className={styles.item}
              >
                <div
                  className={`${styles.icon} ${
                    styles[activity.status]
                  }`}
                >
                  <Icon size={13} />
                </div>
  
                <div className={styles.content}>
                  <span>{activity.message}</span>
  
                  <time>
                    {new Date(
                      activity.createdAt,
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }