"use client";

import { create } from "zustand";

interface UIState {
    settingsOpen: boolean;
    profileOpen: boolean;

    openSettings: () => void;
    closeSettings: () => void;

    openProfile: () => void;
    closeProfile: () => void;
}

export const useUIStore = create<UIState>(
    (set) => ({
        settingsOpen: false,
        profileOpen: false,

        openSettings: () =>
            set({
                settingsOpen: true,
                profileOpen: false,
            }),

        closeSettings: () =>
            set({
                settingsOpen: false,
            }),

        openProfile: () =>
            set({
                profileOpen: true,
                settingsOpen: false,
            }),

        closeProfile: () =>
            set({
                profileOpen: false,
            }),
    }),
);