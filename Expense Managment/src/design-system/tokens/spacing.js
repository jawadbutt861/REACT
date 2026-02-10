// Design System Spacing Tokens
export const spacing = {
  // Base spacing scale (rem units)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
}

// Semantic spacing for common use cases
export const semanticSpacing = {
  // Component internal spacing
  component: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[3],    // 12px
    lg: spacing[4],    // 16px
    xl: spacing[6],    // 24px
  },
  
  // Layout spacing
  layout: {
    xs: spacing[4],    // 16px
    sm: spacing[6],    // 24px
    md: spacing[8],    // 32px
    lg: spacing[12],   // 48px
    xl: spacing[16],   // 64px
    xxl: spacing[24],  // 96px
  },
  
  // Form element spacing
  form: {
    fieldGap: spacing[4],      // 16px between form fields
    labelGap: spacing[2],      // 8px between label and input
    groupGap: spacing[6],      // 24px between form groups
    sectionGap: spacing[8],    // 32px between form sections
  },
  
  // Card and container spacing
  container: {
    padding: {
      xs: spacing[3],    // 12px
      sm: spacing[4],    // 16px
      md: spacing[6],    // 24px
      lg: spacing[8],    // 32px
      xl: spacing[10],   // 40px
    },
    gap: {
      xs: spacing[2],    // 8px
      sm: spacing[4],    // 16px
      md: spacing[6],    // 24px
      lg: spacing[8],    // 32px
    }
  },
  
  // Button spacing
  button: {
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`,    // 8px 12px
      md: `${spacing[3]} ${spacing[4]}`,    // 12px 16px
      lg: `${spacing[4]} ${spacing[6]}`,    // 16px 24px
      xl: `${spacing[5]} ${spacing[8]}`,    // 20px 32px
    },
    gap: spacing[2],  // 8px between button elements
  },
}

// Grid and layout utilities
export const grid = {
  columns: {
    1: '1fr',
    2: 'repeat(2, 1fr)',
    3: 'repeat(3, 1fr)',
    4: 'repeat(4, 1fr)',
    6: 'repeat(6, 1fr)',
    12: 'repeat(12, 1fr)',
  },
  
  gaps: {
    xs: spacing[2],    // 8px
    sm: spacing[4],    // 16px
    md: spacing[6],    // 24px
    lg: spacing[8],    // 32px
    xl: spacing[12],   // 48px
  }
}

// Responsive breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}