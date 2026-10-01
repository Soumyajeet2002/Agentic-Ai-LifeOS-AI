"use client";

import Link from "next/link";
import {
  CalendarDays,
  CheckSquare,
  Home,
  Brain,
  Database,
  Settings,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";

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
    label: "Tools",
    href: "/integrations",
    icon: Wrench,
  },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>
          <Sparkles size={17} />
        </div>

        <span>LifeOS</span>
      </div>

      <nav className={styles.navigation}>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <Link
          href="/settings"
          className={styles.link}
        >
          <Settings size={17} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}