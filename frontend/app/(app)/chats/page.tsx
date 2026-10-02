"use client";

import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

import { ChatList } from "@/features/chats/components/ChatList";
import { mockChats } from "@/features/chats/data/mockChats";


import { mockProjects } from "@/features/projects/data/mockProjects";

import type {
    Chat,
    ChatMessage,
} from "@/features/chats/types/chat";

import styles from "./page.module.css";

export default function ChatsPage() {
    const [chats, setChats] = useState<Chat[]>(
        mockChats,
    );
    const [selectedProjectId, setSelectedProjectId] =
        useState<string>("");

    const [activeChatId, setActiveChatId] =
        useState<string | undefined>(
            mockChats[0]?.id,
        );

    const [message, setMessage] =
        useState("");

    const activeChat = chats.find(
        (chat) => chat.id === activeChatId,
    );

    function createChat() {
        const now = new Date().toISOString();

        const newChat: Chat = {
            id: `chat-${Date.now()}`,
            title: "New conversation",
            messages: [],
            projectId:
                selectedProjectId || undefined,
            status: "active",
            createdAt: now,
            updatedAt: now,
        };

        setChats((current) => [
            newChat,
            ...current,
        ]);

        setActiveChatId(newChat.id);
    }

    function sendMessage() {
        const content = message.trim();

        if (!content || !activeChat) {
            return;
        }

        const newMessage: ChatMessage = {
            id: `message-${Date.now()}`,
            role: "user",
            content,
            createdAt:
                new Date().toISOString(),
        };

        setChats((current) =>
            current.map((chat) =>
                chat.id === activeChat.id
                    ? {
                        ...chat,
                        title:
                            chat.messages.length === 0
                                ? content.slice(0, 45)
                                : chat.title,
                        messages: [
                            ...chat.messages,
                            newMessage,
                        ],
                        updatedAt:
                            newMessage.createdAt,
                    }
                    : chat,
            ),
        );

        setMessage("");
    }

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLTextAreaElement>,
    ) {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            sendMessage();
        }
    }

    return (
        <main className={styles.page}>
            <ChatList
                chats={chats}
                activeChatId={activeChatId}
                onSelect={(chat) =>
                    setActiveChatId(chat.id)
                }
                onNewChat={createChat}
            />

            <section className={styles.workspace}>
                {activeChat ? (
                    <>
                        <header className={styles.header}>
                            <div className={styles.projectSelector}>
                                <label htmlFor="chat-project">
                                    Project
                                </label>

                                <select
                                    id="chat-project"
                                    value={selectedProjectId}
                                    onChange={(event) =>
                                        setSelectedProjectId(
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="">
                                        No project
                                    </option>

                                    {mockProjects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <span className={styles.eyebrow}>
                                    CONVERSATION
                                </span>

                                <h1>{activeChat.title}</h1>
                            </div>

                            <div className={styles.agentBadge}>
                                <Sparkles size={12} />
                                LifeOS Agent
                            </div>
                        </header>

                        <div className={styles.messages}>
                            {activeChat.messages.length ===
                                0 ? (
                                <div className={styles.emptyChat}>
                                    <div
                                        className={styles.aiIcon}
                                    >
                                        <Sparkles size={20} />
                                    </div>

                                    <h2>
                                        What do you want to
                                        accomplish?
                                    </h2>

                                    <p>
                                        Tell LifeOS what you're
                                        trying to achieve. You can
                                        always connect this chat to a
                                        project later.
                                    </p>
                                </div>
                            ) : (
                                activeChat.messages.map(
                                    (item) => (
                                        <div
                                            key={item.id}
                                            className={
                                                item.role === "user"
                                                    ? styles.userMessage
                                                    : styles.assistantMessage
                                            }
                                        >
                                            <span>
                                                {item.role ===
                                                    "user"
                                                    ? "You"
                                                    : "LifeOS"}
                                            </span>

                                            <p>{item.content}</p>
                                        </div>
                                    ),
                                )
                            )}
                        </div>

                        <div className={styles.composer}>
                            <textarea
                                value={message}
                                onChange={(event) =>
                                    setMessage(
                                        event.target.value,
                                    )
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Tell LifeOS what you want to accomplish..."
                                rows={1}
                            />

                            <button
                                type="button"
                                onClick={sendMessage}
                                disabled={!message.trim()}
                                aria-label="Send message"
                            >
                                <ArrowUp size={16} />
                            </button>

                            <span>
                                Enter to send · Shift + Enter
                                for a new line
                            </span>
                        </div>
                    </>
                ) : (
                    <div className={styles.noChat}>
                        <Sparkles size={22} />

                        <h2>
                            Start a conversation
                        </h2>

                        <button
                            type="button"
                            onClick={createChat}
                        >
                            New chat
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}