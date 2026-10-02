"use client";

import {
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

import type { Integration } from "../types/integration";

import styles from "./IntegrationCard.module.css";

interface IntegrationCardProps {
  integration: Integration;

  onConnect: (
    integration: Integration,
  ) => void;

  onDisconnect: (
    integration: Integration,
  ) => void;
}

export function IntegrationCard({
  integration,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  const isConnected =
    integration.status === "connected";

  const isComingSoon =
    integration.status === "coming_soon";

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.logo}>
          {integration.name.charAt(0)}
        </div>

        <div className={styles.status}>
          {isConnected ? (
            <>
              <Check size={11} />
              Connected
            </>
          ) : isComingSoon ? (
            "Coming soon"
          ) : (
            "Available"
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3>{integration.name}</h3>

        <p>{integration.description}</p>
      </div>

      {integration.permissions.length > 0 && (
        <div className={styles.permissions}>
          <div className={styles.permissionHeader}>
            <ShieldCheck size={12} />

            <span>
              Permissions
            </span>
          </div>

          <ul>
            {integration.permissions.map(
              (permission) => (
                <li key={permission}>
                  {permission}
                </li>
              ),
            )}
          </ul>
        </div>
      )}

      <div className={styles.footer}>
        {isConnected ? (
          <button
            type="button"
            className={styles.disconnect}
            onClick={() =>
              onDisconnect(integration)
            }
          >
            Disconnect
          </button>
        ) : isComingSoon ? (
          <button
            type="button"
            className={styles.disabled}
            disabled
          >
            Coming soon
          </button>
        ) : (
          <button
            type="button"
            className={styles.connect}
            onClick={() =>
              onConnect(integration)
            }
          >
            Connect
            <ExternalLink size={12} />
          </button>
        )}
      </div>
    </article>
  );
}