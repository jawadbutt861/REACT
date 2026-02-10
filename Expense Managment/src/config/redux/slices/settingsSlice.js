import { createSlice } from '@reduxjs/toolkit'

// Load settings from localStorage
const loadSettingsFromStorage = () => {
  try {
    const savedSettings = localStorage.getItem('expense-app-settings')
    return savedSettings ? JSON.parse(savedSettings) : {}
  } catch (error) {
    console.warn('Failed to load settings from localStorage:', error)
    return {}
  }
}

const initialState = {
  // General settings
  currency: 'PKR',
  dateFormat: 'MM/dd/yyyy',
  numberFormat: 'en-US',
  
  // Theme settings (managed by ThemeContext but stored here for persistence)
  theme: 'light',
  useSystemTheme: false,
  
  // Notification settings
  notifications: {
    budgetAlerts: true,
    expenseReminders: true,
    weeklyReports: false,
    monthlyReports: true,
    sound: true,
    desktop: true,
  },
  
  // Data settings
  autoBackup: false,
  backupFrequency: 'weekly', // 'daily' | 'weekly' | 'monthly'
  dataRetention: 365, // days
  
  // Privacy settings
  analytics: false,
  crashReporting: true,
  
  // Export settings
  defaultExportFormat: 'csv',
  includeMetadata: true,
  
  // Import settings
  duplicateHandling: 'skip', // 'skip' | 'merge' | 'replace'
  
  // Keyboard shortcuts
  shortcuts: {
    addExpense: 'ctrl+n',
    search: 'ctrl+f',
    toggleTheme: 'ctrl+shift+t',
    exportData: 'ctrl+e',
    showHelp: 'f1',
  },
  
  // Advanced settings
  enableExperimentalFeatures: false,
  debugMode: false,
  
  // Load saved settings
  ...loadSettingsFromStorage(),
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSetting: (state, action) => {
      const { key, value } = action.payload
      if (key.includes('.')) {
        const keys = key.split('.')
        let current = state
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]]
        }
        current[keys[keys.length - 1]] = value
      } else {
        state[key] = value
      }
    },
    
    updateMultipleSettings: (state, action) => {
      const settings = action.payload
      Object.entries(settings).forEach(([key, value]) => {
        if (key.includes('.')) {
          const keys = key.split('.')
          let current = state
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]]
          }
          current[keys[keys.length - 1]] = value
        } else {
          state[key] = value
        }
      })
    },
    
    resetSettings: (state) => {
      return initialState
    },
    
    resetToDefaults: (state, action) => {
      const section = action.payload
      if (section && initialState[section]) {
        state[section] = initialState[section]
      } else {
        return initialState
      }
    },
    
    // Notification settings
    toggleNotification: (state, action) => {
      const type = action.payload
      state.notifications[type] = !state.notifications[type]
    },
    
    // Shortcut settings
    updateShortcut: (state, action) => {
      const { action: actionName, shortcut } = action.payload
      state.shortcuts[actionName] = shortcut
    },
    
    resetShortcuts: (state) => {
      state.shortcuts = initialState.shortcuts
    },
  },
})

// Middleware to save settings to localStorage
export const settingsMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  
  // Save settings to localStorage when they change
  if (action.type.startsWith('settings/')) {
    try {
      const settings = store.getState().settings
      localStorage.setItem('expense-app-settings', JSON.stringify(settings))
    } catch (error) {
      console.warn('Failed to save settings to localStorage:', error)
    }
  }
  
  return result
}

export const {
  updateSetting,
  updateMultipleSettings,
  resetSettings,
  resetToDefaults,
  toggleNotification,
  updateShortcut,
  resetShortcuts,
} = settingsSlice.actions

// Selectors
export const selectCurrency = (state) => state.settings.currency
export const selectDateFormat = (state) => state.settings.dateFormat
export const selectNumberFormat = (state) => state.settings.numberFormat
export const selectThemeSettings = (state) => ({
  theme: state.settings.theme,
  useSystemTheme: state.settings.useSystemTheme,
})
export const selectNotificationSettings = (state) => state.settings.notifications
export const selectDataSettings = (state) => ({
  autoBackup: state.settings.autoBackup,
  backupFrequency: state.settings.backupFrequency,
  dataRetention: state.settings.dataRetention,
})
export const selectPrivacySettings = (state) => ({
  analytics: state.settings.analytics,
  crashReporting: state.settings.crashReporting,
})
export const selectExportSettings = (state) => ({
  defaultExportFormat: state.settings.defaultExportFormat,
  includeMetadata: state.settings.includeMetadata,
})
export const selectImportSettings = (state) => ({
  duplicateHandling: state.settings.duplicateHandling,
})
export const selectShortcuts = (state) => state.settings.shortcuts
export const selectAdvancedSettings = (state) => ({
  enableExperimentalFeatures: state.settings.enableExperimentalFeatures,
  debugMode: state.settings.debugMode,
})

export default settingsSlice.reducer