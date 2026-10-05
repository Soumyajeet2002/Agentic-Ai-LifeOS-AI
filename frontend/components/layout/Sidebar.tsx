"use client";

import {
  CalendarDays,
  CheckSquare,
  FolderKanban,
  Home,
  Layers3,
  MessageSquare,
  Brain,
  Settings,
  UserRound,
  Target,
  Wrench,
} from "lucide-react";

import { useWorkspaceStore, type Workspace } from "@/stores/workspaceStore";

import styles from "./Sidebar.module.css";
import { useUIStore } from "@/stores/uiStore";

interface NavigationItem {
  id: Workspace;
  label: string;
  icon: React.ElementType;
}

const primaryNavigation: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "chats",
    label: "Chats",
    icon: MessageSquare,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    id: "goals",
    label: "Goals",
    icon: Target,
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
];

const secondaryNavigation: NavigationItem[] = [
  {
    id: "knowledge",
    label: "Knowledge",
    icon: Layers3,
  },
  {
    id: "memory",
    label: "Memory",
    icon: Brain,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Wrench,
  },
];

export function Sidebar() {
  const { activeWorkspace, setWorkspace } = useWorkspaceStore();

  const { openSettings, openProfile } = useUIStore();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>L</div>

        <span>LifeOS</span>
      </div>

      <nav className={styles.navigation}>
        <NavigationGroup
          items={primaryNavigation}
          activeWorkspace={activeWorkspace}
          onSelect={setWorkspace}
        />

        <div className={styles.separator} />

        <NavigationGroup
          items={secondaryNavigation}
          activeWorkspace={activeWorkspace}
          onSelect={setWorkspace}
        />
      </nav>

      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.bottomItem}
          onClick={openSettings}
        >
          <Settings size={15} />
          <span>Settings</span>
        </button>

        <button type="button" className={styles.profile} onClick={openProfile}>
          <div className={styles.avatar}>A</div>

          <div className={styles.profileText}>
            <strong>Alex</strong>
            <span>Personal workspace</span>
          </div>

          <UserRound size={13} />
        </button>
      </div>
    </aside>
  );
}

interface NavigationGroupProps {
  items: NavigationItem[];
  activeWorkspace: Workspace;
  onSelect: (workspace: Workspace) => void;
}

function NavigationGroup({
  items,
  activeWorkspace,
  onSelect,
}: NavigationGroupProps) {
  return (
    <div className={styles.group}>
      {items.map((item) => {
        const Icon = item.icon;

        const active = activeWorkspace === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.item} ${active ? styles.active : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <Icon size={15} />

            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
