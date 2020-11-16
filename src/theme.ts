import palx from 'palx'

const palette = palx('#446ccf') // han blue
const brand = palette.cyan
const white = '#FFFFFF'

export const theme = {
  palette,
  brand,
  bg: {
    white: '#FFFFFF',
    brand: brand[8],
  },
  semantic: {
    base: palette.gray[8],
    brand: brand[8],
    success: palette.green[8],
    error: palette.red[8],
    warning: palette.orange[8],
    inverted: white,
  },
  text: {
    color: {
      base: palette.black,
      brand: brand[9],
      inverted: white,
    },
    size: {
      sm: '0.8rem',
      md: '1rem',
      lg: '1.4rem',
      xl: '1.8rem',
    },
  },
  heading: {
    color: {
      base: palette.black,
      brand: brand[9],
      inverted: white,
    },
    size: {
      sm: '1rem',
      md: '1.4rem',
      lg: '1.8rem',
      xl: '3rem',
    },
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
  },
  border: {
    radii: '4px',
    color: palette.gray[8],
    width: '1px',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
}

export type Theme = typeof theme
