import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { lightTheme, darkTheme, colors } from '../tokens/colors.js'

// Theme Context
const ThemeContext = createContext()

// Theme action types
const THEME_ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  SET_SYSTEM_PREFERENCE: 'SET_SYSTEM_PREFERENCE',
}

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.TOGGLE_THEME:
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light'
      return {
        ...state,
        currentTheme: newTheme,
        isSystemPreference: false,
      }
    
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        currentTheme: action.payload,
        isSystemPreference: false,
      }
    
    case THEME_ACTIONS.SET_SYSTEM_PREFERENCE:
      return {
        ...state,
        systemPreference: action.payload,
        currentTheme: state.isSystemPreference ? action.payload : state.currentTheme,
      }
    
    default:
      return state
  }
}

// Get system theme preference
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

// Load theme from localStorage
const loadThemeFromStorage = () => {
  try {
    const savedTheme = localStorage.getItem('expense-app-theme')
    const savedIsSystemPreference = localStorage.getItem('expense-app-use-system-theme')
    
    if (savedIsSystemPreference === 'true') {
      return {
        currentTheme: getSystemTheme(),
        isSystemPreference: true,
      }
    }
    
    return {
      currentTheme: savedTheme || 'light',
      isSystemPreference: false,
    }
  } catch (error) {
    console.warn('Failed to load theme from localStorage:', error)
    return {
      currentTheme: 'light',
      isSystemPreference: false,
    }
  }
}

// Initial state
const getInitialState = () => {
  const { currentTheme, isSystemPreference } = loadThemeFromStorage()
  return {
    currentTheme,
    isSystemPreference,
    systemPreference: getSystemTheme(),
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    colors,
  }
}

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, getInitialState())

  // Save theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('expense-app-theme', state.currentTheme)
      localStorage.setItem('expense-app-use-system-theme', state.isSystemPreference.toString())
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }, [state.currentTheme, state.isSystemPreference])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      dispatch({
        type: THEME_ACTIONS.SET_SYSTEM_PREFERENCE,
        payload: e.matches ? 'dark' : 'light'
      })
    }

    mediaQuery.addEventListener('change', handleChange)
    
    // Set initial system preference
    dispatch({
      type: THEME_ACTIONS.SET_SYSTEM_PREFERENCE,
      payload: mediaQuery.matches ? 'dark' : 'light'
    })

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply CSS custom properties to document root
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const currentThemeColors = state.themes[state.currentTheme]

    // Apply theme colors as CSS custom properties
    Object.entries(currentThemeColors).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        root.style.setProperty(`--color-${category}-${key}`, value)
      })
    })

    // Apply base colors
    Object.entries(colors).forEach(([colorName, colorValues]) => {
      if (typeof colorValues === 'object') {
        Object.entries(colorValues).forEach(([shade, value]) => {
          root.style.setProperty(`--color-${colorName}-${shade}`, value)
        })
      }
    })

    // Set theme class on body
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${state.currentTheme}`)

  }, [state.currentTheme, state.themes])

  // Theme context value
  const contextValue = {
    // Current theme state
    currentTheme: state.currentTheme,
    isSystemPreference: state.isSystemPreference,
    systemPreference: state.systemPreference,
    
    // Theme objects
    theme: state.themes[state.currentTheme],
    themes: state.themes,
    colors: state.colors,
    
    // Theme actions
    toggleTheme: () => dispatch({ type: THEME_ACTIONS.TOGGLE_THEME }),
    setTheme: (theme) => dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme }),
    useSystemTheme: () => {
      dispatch({ type: THEME_ACTIONS.SET_THEME, payload: state.systemPreference })
      // Set system preference flag
      const newState = { ...state, isSystemPreference: true }
      try {
        localStorage.setItem('expense-app-use-system-theme', 'true')
      } catch (error) {
        console.warn('Failed to save system theme preference:', error)
      }
    },
    
    // Utility functions
    isDark: state.currentTheme === 'dark',
    isLight: state.currentTheme === 'light',
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

// HOC for theme-aware components
export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    const theme = useTheme()
    return <Component {...props} theme={theme} />
  }
}

export default ThemeContext