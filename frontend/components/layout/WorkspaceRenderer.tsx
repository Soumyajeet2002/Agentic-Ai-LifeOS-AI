"use client";

import { useWorkspaceStore } from "@/stores/workspaceStore";

import Dashboard from "@/features/dashboard/components/Dashboard";
import Projects from "@/features/projects/components/Projects";
import Chats from "@/features/chats/components/Chats";
import Goals from "@/features/goals/components/Goals";
import Integration from "@/features/integrations/components/Integration";
import Knowledge from "@/features/knowledge/components/Knowledge";
import Memory from "@/features/memory/components/Memory";
import Task from "@/features/tasks/components/Task";
import Calendar from "@/features/calendar/components/Calendar";

// import { Calendar } from "lucide-react";

export function WorkspaceRenderer() {
  const { activeWorkspace } = useWorkspaceStore();

  switch (activeWorkspace) {
    case "home":
      return <Dashboard />;
    case "projects":
      return <Projects />;
    case "chats":
      return <Chats />;
    case "goals":
      return <Goals />;
    case "integrations":
      return <Integration />;
    case "memory":
      return <Memory />;
    case "knowledge":
      return <Knowledge />;
    case "calendar":
      return <Calendar />;
    case "tasks":
      return <Task />;

    default:
      return (
        <div
          style={{
            padding: "40px",
          }}
        >
          <h1>{activeWorkspace}</h1>

          <p>This workspace is coming next.</p>
        </div>
      );
  }
}
