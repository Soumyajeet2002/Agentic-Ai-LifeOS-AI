"use client";

import { FolderKanban, Plus, Shield } from "lucide-react";
import Link from "next/link";

import { mockProjects } from "@/features/projects/data/mockProjects";

import type { Project } from "@/features/projects/types/project";

import styles from "./Projects.module.css";

import { useState } from "react";

import { CreateProjectModal } from "@/features/projects/components/CreateProjectModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>WORKSPACE</p>

          <h1>Projects</h1>

          <p>
            Organize conversations, goals, tasks, knowledge, and project context
            in one place.
          </p>
        </div>

        <button
          type="button"
          className={styles.createButton}
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus size={15} />
          New Project
        </button>
      </header>

      <section className={styles.grid}>
        {projects.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.projectIcon}>
                <FolderKanban size={17} />
              </div>

              <span
                className={`${styles.memoryBadge} ${
                  project.memoryMode === "project-only"
                    ? styles.projectOnly
                    : ""
                }`}
              >
                <Shield size={10} />

                {project.memoryMode === "project-only"
                  ? "Project memory"
                  : "Default memory"}
              </span>
            </div>

            <h2>{project.name}</h2>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.footer}>
              <span>0 chats</span>

              <Link
                href={`/projects/${project.id}`}
                className={styles.openProject}
              >
                Open project
              </Link>
            </div>
          </article>
        ))}

        <button
          type="button"
          className={styles.addCard}
          onClick={() => setCreateModalOpen(true)}
        >
          <div className={styles.addIcon}>
            <Plus size={18} />
          </div>

          <strong>Create a project</strong>

          <span>
            Start a focused workspace for your goals and conversations.
          </span>
        </button>
      </section>

      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={(project) => {
          setProjects((current) => [project, ...current]);

          setCreateModalOpen(false);
        }}
      />
    </main>
  );
}
