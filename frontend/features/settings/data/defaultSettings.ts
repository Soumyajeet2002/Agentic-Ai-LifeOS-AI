import type { UserSettings } from "../types/settings";

export const defaultSettings: UserSettings = {
  ai: {
    proactiveSuggestions: true,
    askBeforeImportantActions: true,
    rememberContext: true,
    showAgentActivity: true,
  },

  notifications: {
    taskReminders: true,
    goalUpdates: true,
    aiSuggestions: true,
    emailNotifications: false,
  },

  privacy: {
    memoryEnabled: true,
    activityHistory: true,
  },
};