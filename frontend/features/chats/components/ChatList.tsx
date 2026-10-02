"use client";

import { MessageSquare, Plus } from "lucide-react";

import type { Chat } from "../types/chat";

import styles from "./ChatList.module.css";

interface ChatListProps {
  chats: Chat[];
  activeChatId?: string;
  onSelect: (chat: Chat) => void;
  onNewChat: () => void;
}

export function ChatList({
  chats,
  activeChatId,
  onSelect,
  onNewChat,
}: ChatListProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>CONVERSATIONS</p>
          <h2>Chats</h2>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          aria-label="New chat"
        >
          <Plus size={15} />
        </button>
      </div>

      <div className={styles.list}>
        {chats.map((chat) => (
          <button
            key={chat.id}
            type="button"
            className={`${styles.chat} ${
              activeChatId === chat.id
                ? styles.active
                : ""
            }`}
            onClick={() => onSelect(chat)}
          >
            <div className={styles.icon}>
              <MessageSquare size={14} />
            </div>

            <div className={styles.info}>
              <span className={styles.title}>
                {chat.title}
              </span>

              <span className={styles.preview}>
                {chat.messages.at(-1)?.content ??
                  "No messages yet"}
              </span>
            </div>
          </button>
        ))}

        {chats.length === 0 && (
          <div className={styles.empty}>
            <MessageSquare size={18} />

            <p>No conversations yet.</p>

            <button
              type="button"
              onClick={onNewChat}
            >
              Start a chat
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}