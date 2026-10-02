export interface AISettings {
    proactiveSuggestions: boolean;
    askBeforeImportantActions: boolean;
    rememberContext: boolean;
    showAgentActivity: boolean;
  }
  
  export interface NotificationSettings {
    taskReminders: boolean;
    goalUpdates: boolean;
    aiSuggestions: boolean;
    emailNotifications: boolean;
  }
  
  export interface PrivacySettings {
    memoryEnabled: boolean;
    activityHistory: boolean;
  }
  
  export interface UserSettings {
    ai: AISettings;
    notifications: NotificationSettings;
    privacy: PrivacySettings;
  }