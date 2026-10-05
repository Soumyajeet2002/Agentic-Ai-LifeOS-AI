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
      {" "}
      {/* SIDEBAR HEADER */}{" "}
      <div className={styles.header}>
        {" "}
        <div className={styles.headerInfo}>
          {" "}
          <p className={styles.label}> CONVERSATIONS </p> <h2>Chats</h2>{" "}
        </div>{" "}
        <button
          type="button"
          className={styles.newChatButton}
          onClick={onNewChat}
          aria-label="New chat"
          title="New chat"
        >
          {" "}
          <Plus size={19} />{" "}
        </button>{" "}
      </div>{" "}
      {/* CHAT LIST */}{" "}
      <div className={styles.list}>
        {" "}
        {chats.map((chat) => {
          const lastMessage = chat.messages.at(-1)?.content;
          return (
            <button
              key={chat.id}
              type="button"
              className={`${styles.chat} ${activeChatId === chat.id ? styles.active : ""}`}
              onClick={() => onSelect(chat)}
            >
              {" "}
              {/* CHAT ICON */}{" "}
              <div className={styles.icon}>
                {" "}
                <MessageSquare size={18} />{" "}
              </div>{" "}
              {/* CHAT INFORMATION */}{" "}
              <div className={styles.info}>
                {" "}
                <span className={styles.title}> {chat.title} </span>{" "}
                <span className={styles.preview}>
                  {" "}
                  {lastMessage ?? "No messages yet"}{" "}
                </span>{" "}
              </div>{" "}
            </button>
          );
        })}{" "}
        {/* EMPTY STATE */}{" "}
        {chats.length === 0 && (
          <div className={styles.empty}>
            {" "}
            <div className={styles.emptyIcon}>
              {" "}
              <MessageSquare size={24} />{" "}
            </div>{" "}
            <p>No conversations yet.</p>{" "}
            <button type="button" onClick={onNewChat}>
              {" "}
              Start a chat{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </aside>
  );
}
