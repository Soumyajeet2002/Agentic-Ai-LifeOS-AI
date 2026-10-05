"use client";

import {
    ArrowLeft,
    FolderKanban,
    MessageSquare,
    Plus,
    Shield,
} from "lucide-react";

import { mockProjects } from "@/features/projects/data/mockProjects";
import { mockChats } from "@/features/chats/data/mockChats";

import { useWorkspaceStore } from "@/stores/workspaceStore";

import styles from "./ProjectWorkspace.module.css";

export function ProjectWorkspace() {
    const {
        activeProjectId,
        setActiveProject,
        setWorkspace,
    } = useWorkspaceStore();

    const project = mockProjects.find(
        (item) => item.id === activeProjectId,
    );

    if (!project) {
        return (
            <main className={styles.notFound}>
                <FolderKanban size={24} />

                <h1>No project selected</h1>

                <button
                    type="button"
                    onClick={() =>
                        setWorkspace("projects")
                    }
                >
                    Back to projects
                </button>
            </main>
        );
    }

    const projectChats = mockChats.filter(
        (chat) =>
            chat.projectId === project.id,
    );

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <button
                        type="button"
                        className={styles.back}
                        onClick={() => {
                            setActiveProject(null);
                            setWorkspace("projects");
                        }}
                    >
                        <ArrowLeft size={13} />
                        Projects
                    </button>

                    <div className={styles.titleRow}>
                        <div className={styles.icon}>
                            <FolderKanban
                                size={19}
                            />
                        </div>

                        <div>
                            <h1>{project.name}</h1>

                            <p>
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className={styles.newChat}
                    onClick={() => {
                        setWorkspace("chats");
                    }}
                >
                    <Plus size={14} />
                    New Chat
                </button>
            </header>

            <nav className={styles.tabs}>
                <button
                    type="button"
                    className={styles.activeTab}
                >
                    Overview
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setWorkspace("chats")
                    }
                >
                    Chats
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setWorkspace("goals")
                    }
                >
                    Goals
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setWorkspace("tasks")
                    }
                >
                    Tasks
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setWorkspace("knowledge")
                    }
                >
                    Knowledge
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setWorkspace("memory")
                    }
                >
                    Memory
                </button>
            </nav>

            <section className={styles.content}>
                <div className={styles.overview}>
                    <div className={styles.card}>
                        <div
                            className={
                                styles.cardHeader
                            }
                        >
                            <div>
                                <span>
                                    PROJECT
                                </span>

                                <h2>
                                    Overview
                                </h2>
                            </div>

                            <span
                                className={
                                    styles.memory
                                }
                            >
                                <Shield size={11} />

                                {project.memoryMode ===
                                "project-only"
                                    ? "Project-only memory"
                                    : "Default memory"}
                            </span>
                        </div>

                        <div className={styles.stats}>
                            <div>
                                <strong>
                                    {
                                        projectChats.length
                                    }
                                </strong>

                                <span>
                                    Chats
                                </span>
                            </div>

                            <div>
                                <strong>
                                    0
                                </strong>

                                <span>
                                    Goals
                                </span>
                            </div>

                            <div>
                                <strong>
                                    0
                                </strong>

                                <span>
                                    Tasks
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div
                            className={
                                styles.cardHeader
                            }
                        >
                            <div>
                                <span>
                                    CONVERSATIONS
                                </span>

                                <h2>
                                    Project chats
                                </h2>
                            </div>
                        </div>

                        {projectChats.length > 0 ? (
                            <div
                                className={
                                    styles.chatList
                                }
                            >
                                {projectChats.map(
                                    (chat) => (
                                        <button
                                            key={
                                                chat.id
                                            }
                                            type="button"
                                            className={
                                                styles.chat
                                            }
                                            onClick={() => {
                                                useWorkspaceStore
                                                    .getState()
                                                    .setActiveChat(
                                                        chat.id,
                                                    );

                                                setWorkspace(
                                                    "chats",
                                                );
                                            }}
                                        >
                                            <div
                                                className={
                                                    styles.chatIcon
                                                }
                                            >
                                                <MessageSquare
                                                    size={
                                                        14
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <strong>
                                                    {
                                                        chat.title
                                                    }
                                                </strong>

                                                <span>
                                                    {chat.messages.at(
                                                        -1,
                                                    )
                                                        ?.content ||
                                                        "No messages yet"}
                                                </span>
                                            </div>
                                        </button>
                                    ),
                                )}
                            </div>
                        ) : (
                            <div
                                className={
                                    styles.empty
                                }
                            >
                                <MessageSquare
                                    size={18}
                                />

                                <p>
                                    No conversations
                                    in this project
                                    yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <aside className={styles.side}>
                    <div
                        className={styles.card}
                    >
                        <div
                            className={
                                styles.cardHeader
                            }
                        >
                            <div>
                                <span>
                                    MEMORY
                                </span>

                                <h2>
                                    Memory settings
                                </h2>
                            </div>
                        </div>

                        <div
                            className={
                                styles.memoryBox
                            }
                        >
                            <Shield size={15} />

                            <div>
                                <strong>
                                    {project.memoryMode ===
                                    "project-only"
                                        ? "Project-only memory"
                                        : "Default memory"}
                                </strong>

                                <p>
                                    {project.memoryMode ===
                                    "project-only"
                                        ? "Memory stays isolated to this project."
                                        : "This project can use your default LifeOS memory."}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={
                                styles.settingsButton
                            }
                        >
                            Manage memory
                        </button>
                    </div>
                </aside>
            </section>
        </main>
    );
}