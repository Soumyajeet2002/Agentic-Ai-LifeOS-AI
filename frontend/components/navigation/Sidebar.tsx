"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Brain,
  CalendarDays,
  CheckSquare,
  Database,
  Home,
  Settings,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

import styles from "./Sidebar.module.css";

const navigation = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    icon: Brain,
  },
  {
    label: "Memory",
    href: "/memory",
    icon: Database,
  },
  {
    label: "Integrations",
    href: "/integrations",
    icon: Wrench,
  },
];

function isRouteActive(
  pathname: string,
  href: string,
) {
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.logo}>
          <Sparkles size={16} strokeWidth={2.2} />
        </div>

        <div className={styles.brandText}>
          <span className={styles.brandName}>LifeOS</span>
          <span className={styles.brandVersion}>AI</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={styles.navigation}
        aria-label="Main navigation"
      >
        <p className={styles.sectionLabel}>
          Workspace
        </p>

        <div className={styles.navigationList}>
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive = isRouteActive(
              pathname,
              item.href,
            );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  styles.link,
                  isActive && styles.active,
                )}
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
              >
                <span
                  className={
                    styles.iconWrapper
                  }
                >
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                  />
                </span>

                <span>{item.label}</span>

                {isActive && (
                  <span
                    className={
                      styles.activeIndicator
                    }
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* AI Status */}
      <div className={styles.aiStatus}>
        <div className={styles.aiStatusIcon}>
          <Sparkles size={15} />
        </div>

        <div className={styles.aiStatusContent}>
          <span>LifeOS AI</span>

          <div className={styles.status}>
            <span
              className={styles.statusDot}
            />

            <span>Ready</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            styles.link,
            isRouteActive(
              pathname,
              "/settings",
            ) && styles.active,
          )}
          aria-current={
            isRouteActive(
              pathname,
              "/settings",
            )
              ? "page"
              : undefined
          }
        >
          <span
            className={styles.iconWrapper}
          >
            <Settings
              size={17}
              strokeWidth={1.8}
            />
          </span>

          <span>Settings</span>

          {isRouteActive(
            pathname,
            "/settings",
          ) && (
            <span
              className={
                styles.activeIndicator
              }
            />
          )}
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={styles.profile}
          aria-label="Open profile"
        >
          <div className={styles.avatar}>
            A
          </div>

          <div className={styles.profileInfo}>
            <span
              className={
                styles.profileName
              }
            >
              Alex
            </span>

            <span
              className={
                styles.profileMeta
              }
            >
              Personal
            </span>
          </div>

          <span
            className={styles.profileMenu}
            aria-hidden="true"
          >
            •••
          </span>
        </Link>
      </div>
    </aside>
  );
}
