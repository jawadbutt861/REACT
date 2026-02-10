// Design System Shadow Tokens
export const shadows = {
  // Elevation shadows
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Inner shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  innerLg: 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)',
  
  // Colored shadows for interactive elements
  primary: '0 4px 14px 0 rgba(102, 126, 234, 0.25)',
  primaryLg: '0 8px 25px 0 rgba(102, 126, 234, 0.35)',
  
  success: '0 4px 14px 0 rgba(34, 197, 94, 0.25)',
  error: '0 4px 14px 0 rgba(239, 68, 68, 0.25)',
  warning: '0 4px 14px 0 rgba(245, 158, 11, 0.25)',
  
  // Focus shadows
  focus: '0 0 0 3px rgba(102, 126, 234, 0.15)',
  focusError: '0 0 0 3px rgba(239, 68, 68, 0.15)',
  focusSuccess: '0 0 0 3px rgba(34, 197, 94, 0.15)',
}

// Semantic shadow mappings
export const semanticShadows = {
  // Card elevations
  card: {
    flat: shadows.none,
    raised: shadows.sm,
    floating: shadows.md,
    elevated: shadows.lg,
    modal: shadows.xl,
  },
  
  // Interactive element shadows
  button: {
    default: shadows.sm,
    hover: shadows.md,
    pressed: shadows.xs,
    focus: shadows.focus,
  },
  
  // Input shadows
  input: {
    default: shadows.inner,
    focus: `${shadows.inner}, ${shadows.focus}`,
    error: `${shadows.inner}, ${shadows.focusError}`,
    success: `${shadows.inner}, ${shadows.focusSuccess}`,
  },
  
  // Dropdown and overlay shadows
  dropdown: shadows.lg,
  tooltip: shadows.md,
  modal: shadows['2xl'],
  
  // Brand-specific shadows
  brand: {
    primary: shadows.primary,
    primaryHover: shadows.primaryLg,
  }
}

// Animation-ready shadow transitions
export const shadowTransitions = {
  default: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}