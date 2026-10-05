"use client";

import {
    Bot,
    ChevronRight,
    Code2,
    Database,
    Keyboard,
    Lock,
    Palette,
    Settings2,
    Shield,
    User,
    Wrench,
} from "lucide-react";

import { useUIStore } from "@/stores/uiStore";
import { Modal } from "@/components/ui/Modal";

import styles from "./SettingsModal.module.css";

const categories = [
    {
        label: "User",
        items: [
            {
                label: "Commonly Used",
                icon: Settings2,
            },
            {
                label: "Profile",
                icon: User,
            },
            {
                label: "Appearance",
                icon: Palette,
            },
        ],
    },
    {
        label: "Workspace",
        items: [
            {
                label: "General",
                icon: Wrench,
            },
            {
                label: "AI & Agents",
                icon: Bot,
            },
            {
                label: "Memory",
                icon: Database,
            },
        ],
    },
    {
        label: "System",
        items: [
            {
                label: "Privacy & Security",
                icon: Shield,
            },
            {
                label: "Keyboard",
                icon: Keyboard,
            },
            {
                label: "Developer",
                icon: Code2,
            },
        ],
    },
];

export function SettingsModal() {
    const {
        settingsOpen,
        closeSettings,
    } = useUIStore();

    return (
        <Modal
            open={settingsOpen}
            onClose={closeSettings}
            title="Settings"
            size="settings"
        >
            <div className={styles.settings}>
                {/* Search */}
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search settings"
                    />

                    <div className={styles.searchActions}>
                        <span>⌘</span>
                        <span>☷</span>
                    </div>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        {categories.map(
                            (category) => (
                                <div
                                    key={
                                        category.label
                                    }
                                    className={
                                        styles.category
                                    }
                                >
                                    <div
                                        className={
                                            styles.categoryTitle
                                        }
                                    >
                                        {
                                            category.label
                                        }
                                    </div>

                                    {category.items.map(
                                        (item, index) => {
                                            const Icon =
                                                item.icon;

                                            return (
                                                <button
                                                    key={
                                                        item.label
                                                    }
                                                    type="button"
                                                    className={`${styles.navItem} ${
                                                        index ===
                                                            0 &&
                                                        category.label ===
                                                            "User"
                                                            ? styles.active
                                                            : ""
                                                    }`}
                                                >
                                                    <Icon
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    <span>
                                                        {
                                                            item.label
                                                        }
                                                    </span>

                                                    <ChevronRight
                                                        size={
                                                            12
                                                        }
                                                    />
                                                </button>
                                            );
                                        },
                                    )}
                                </div>
                            ))}
                    </aside>

                    {/* Content */}
                    <main className={styles.main}>
                        <div
                            className={
                                styles.contentHeader
                            }
                        >
                            <div>
                                <span
                                    className={
                                        styles.breadcrumb
                                    }
                                >
                                    User
                                </span>

                                <h1>
                                    Commonly Used
                                </h1>
                            </div>

                            <button
                                type="button"
                                className={
                                    styles.syncButton
                                }
                            >
                                Backup and Sync Settings
                            </button>
                        </div>

                        <div
                            className={
                                styles.settingsList
                            }
                        >
                            <SettingRow
                                title="Editor: Font Size"
                                description="Controls the font size in pixels."
                            >
                                <input
                                    className={
                                        styles.textInput
                                    }
                                    defaultValue="14"
                                />
                            </SettingRow>

                            <SettingRow
                                title="Editor: Format On Save"
                                description="Automatically formats files when they are saved."
                            >
                                <Toggle />
                            </SettingRow>

                            <SettingRow
                                title="Files: Auto Save"
                                description="Controls automatic saving of files with unsaved changes."
                            >
                                <select
                                    className={
                                        styles.select
                                    }
                                    defaultValue="off"
                                >
                                    <option value="off">
                                        off
                                    </option>

                                    <option value="afterDelay">
                                        afterDelay
                                    </option>

                                    <option value="onFocusChange">
                                        onFocusChange
                                    </option>
                                </select>
                            </SettingRow>

                            <SettingRow
                                title="Editor: Default Formatter"
                                description="Defines the default formatter used by the workspace."
                            >
                                <select
                                    className={
                                        styles.select
                                    }
                                    defaultValue="none"
                                >
                                    <option value="none">
                                        None
                                    </option>

                                    <option value="prettier">
                                        Prettier
                                    </option>
                                </select>
                            </SettingRow>

                            <SettingRow
                                title="Editor: Word Wrap"
                                description="Controls how long lines are wrapped inside the editor."
                            >
                                <select
                                    className={
                                        styles.select
                                    }
                                    defaultValue="on"
                                >
                                    <option value="on">
                                        on
                                    </option>

                                    <option value="off">
                                        off
                                    </option>
                                </select>
                            </SettingRow>

                            <SettingRow
                                title="LifeOS: AI Suggestions"
                                description="Allow LifeOS to provide contextual suggestions while you work."
                            >
                                <Toggle
                                    checked
                                />
                            </SettingRow>

                            <SettingRow
                                title="LifeOS: Memory"
                                description="Allow the AI to use your configured memory context."
                            >
                                <Toggle
                                    checked
                                />
                            </SettingRow>
                        </div>
                    </main>
                </div>
            </div>
        </Modal>
    );
}

interface SettingRowProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

function SettingRow({
    title,
    description,
    children,
}: SettingRowProps) {
    return (
        <section className={styles.setting}>
            <div className={styles.settingInfo}>
                <h3>{title}</h3>

                <p>{description}</p>
            </div>

            <div className={styles.control}>
                {children}
            </div>
        </section>
    );
}

interface ToggleProps {
    checked?: boolean;
}

function Toggle({
    checked = false,
}: ToggleProps) {
    return (
        <label className={styles.toggle}>
            <input
                type="checkbox"
                defaultChecked={checked}
            />

            <span />
        </label>
    );
}