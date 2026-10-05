"use client";

import {
    Bell,
    Brain,
    ChevronRight,
    LogOut,
    Mail,
    Shield,
    UserRound,
} from "lucide-react";

import { useUIStore } from "@/stores/uiStore";
import { Modal } from "@/components/ui/Modal";

import styles from "./ProfileModal.module.css";

export function ProfileModal() {
    const {
        profileOpen,
        closeProfile,
    } = useUIStore();

    return (
        <Modal
            open={profileOpen}
            onClose={closeProfile}
            title="Profile"
            size="settings"
        >
            <div className={styles.profilePage}>
                {/* Profile header */}
                <section className={styles.profileHeader}>
                    <div className={styles.avatar}>
                        A
                    </div>

                    <div className={styles.identity}>
                        <h1>Alex</h1>

                        <p>
                            Personal LifeOS workspace
                        </p>

                        <span className={styles.status}>
                            <span />
                            Active
                        </span>
                    </div>

                    <button
                        type="button"
                        className={styles.editButton}
                    >
                        Edit profile
                    </button>
                </section>

                {/* Main content */}
                <div className={styles.content}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div>
                                <span className={styles.eyebrow}>
                                    ACCOUNT
                                </span>

                                <h2>
                                    Personal information
                                </h2>

                                <p>
                                    Manage the information
                                    associated with your
                                    LifeOS account.
                                </p>
                            </div>
                        </div>

                        <div className={styles.rows}>
                            <ProfileRow
                                icon={UserRound}
                                label="Name"
                                value="Alex"
                            />

                            <ProfileRow
                                icon={Mail}
                                label="Email"
                                value="alex@example.com"
                            />

                            <ProfileRow
                                icon={Shield}
                                label="Account"
                                value="Personal"
                            />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div>
                                <span className={styles.eyebrow}>
                                    LIFEOS
                                </span>

                                <h2>
                                    AI preferences
                                </h2>

                                <p>
                                    Control how LifeOS
                                    understands and assists
                                    you.
                                </p>
                            </div>
                        </div>

                        <div className={styles.rows}>
                            <ProfileAction
                                icon={Brain}
                                title="Memory"
                                description="Manage what LifeOS remembers about you."
                                value="Enabled"
                            />

                            <ProfileAction
                                icon={Bell}
                                title="Notifications"
                                description="Control LifeOS notifications and activity updates."
                                value="Manage"
                            />
                        </div>
                    </section>

                    <section className={styles.dangerSection}>
                        <div>
                            <span className={styles.eyebrow}>
                                ACCOUNT
                            </span>

                            <h2>
                                Sign out
                            </h2>

                            <p>
                                Sign out of this LifeOS
                                workspace.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={styles.logoutButton}
                        >
                            <LogOut size={15} />
                            Sign out
                        </button>
                    </section>
                </div>
            </div>
        </Modal>
    );
}

interface ProfileRowProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

function ProfileRow({
    icon: Icon,
    label,
    value,
}: ProfileRowProps) {
    return (
        <div className={styles.row}>
            <div className={styles.rowIcon}>
                <Icon size={16} />
            </div>

            <div className={styles.rowText}>
                <span>{label}</span>
                <strong>{value}</strong>
            </div>

            <button
                type="button"
                className={styles.rowAction}
                aria-label={`Edit ${label}`}
            >
                <ChevronRight size={15} />
            </button>
        </div>
    );
}

interface ProfileActionProps {
    icon: React.ElementType;
    title: string;
    description: string;
    value: string;
}

function ProfileAction({
    icon: Icon,
    title,
    description,
    value,
}: ProfileActionProps) {
    return (
        <button
            type="button"
            className={styles.actionRow}
        >
            <div className={styles.rowIcon}>
                <Icon size={16} />
            </div>

            <div className={styles.actionText}>
                <strong>{title}</strong>

                <span>{description}</span>
            </div>

            <div className={styles.actionValue}>
                {value}
                <ChevronRight size={15} />
            </div>
        </button>
    );
}