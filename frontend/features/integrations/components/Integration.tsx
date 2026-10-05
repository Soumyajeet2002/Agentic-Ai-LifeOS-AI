"use client";

import { useMemo, useState } from "react";
import { Search, ShieldCheck } from "lucide-react";

import { IntegrationCard } from "@/features/integrations/components/IntegrationCard";
import { mockIntegrations } from "@/features/integrations/data/mockIntegrations";

import type { Integration } from "@/features/integrations/types/integration";

import styles from "./Integration.module.css";

type Filter =
  | "all"
  | Integration["category"];

export default function ToolsPage() {
  const [integrations, setIntegrations] =
    useState(mockIntegrations);

  const [query, setQuery] =
    useState("");

  const [filter, setFilter] =
    useState<Filter>("all");

  const filteredIntegrations = useMemo(() => {
    const normalized =
      query.toLowerCase().trim();

    return integrations.filter(
      (integration) => {
        const matchesFilter =
          filter === "all" ||
          integration.category === filter;

        if (!matchesFilter) {
          return false;
        }

        if (!normalized) {
          return true;
        }

        return (
          integration.name
            .toLowerCase()
            .includes(normalized) ||
          integration.description
            .toLowerCase()
            .includes(normalized)
        );
      },
    );
  }, [integrations, query, filter]);

  function connectIntegration(
    integration: Integration,
  ) {
    setIntegrations((current) =>
      current.map((item) =>
        item.id === integration.id
          ? {
              ...item,
              status: "connected",
              connectedAt:
                new Date().toISOString(),
            }
          : item,
      ),
    );
  }

  function disconnectIntegration(
    integration: Integration,
  ) {
    setIntegrations((current) =>
      current.map((item) =>
        item.id === integration.id
          ? {
              ...item,
              status: "available",
              connectedAt: undefined,
            }
          : item,
      ),
    );
  }

  const filters: {
    id: Filter;
    label: string;
  }[] = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "productivity",
      label: "Productivity",
    },
    {
      id: "communication",
      label: "Communication",
    },
    {
      id: "storage",
      label: "Storage",
    },
    {
      id: "knowledge",
      label: "Knowledge",
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            TOOLS
          </p>

          <h1>Integrations</h1>

          <p className={styles.description}>
            Connect the tools LifeOS can use to
            help you get things done.
          </p>
        </div>
      </header>

      <section className={styles.security}>
        <div className={styles.securityIcon}>
          <ShieldCheck size={17} />
        </div>

        <div>
          <strong>
            You control what LifeOS can access.
          </strong>

          <p>
            Connected tools can only be used
            according to the permissions you
            authorize.
          </p>
        </div>
      </section>

      <div className={styles.search}>
        <Search size={15} />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search integrations..."
        />
      </div>

      <nav className={styles.filters}>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              filter === item.id
                ? styles.activeFilter
                : styles.filter
            }
            onClick={() =>
              setFilter(item.id)
            }
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className={styles.grid}>
        {filteredIntegrations.map(
          (integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConnect={
                connectIntegration
              }
              onDisconnect={
                disconnectIntegration
              }
            />
          ),
        )}
      </section>
    </main>
  );
}