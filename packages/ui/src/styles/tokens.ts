export const designTokens = {
  colors: {
    // Semantic colors
    background: {
      primary: 'hsl(var(--background-primary))',
      secondary: 'hsl(var(--background-secondary))',
      tertiary: 'hsl(var(--background-tertiary))',
      canvas: 'hsl(var(--background-canvas))',
    },
    foreground: {
      primary: 'hsl(var(--foreground-primary))',
      secondary: 'hsl(var(--foreground-secondary))',
      tertiary: 'hsl(var(--foreground-tertiary))',
    },
    border: {
      subtle: 'hsl(var(--border-subtle))',
      default: 'hsl(var(--border-default))',
      strong: 'hsl(var(--border-strong))',
    },
    accent: {
      primary: 'hsl(var(--accent-primary))',
      secondary: 'hsl(var(--accent-secondary))',
      hover: 'hsl(var(--accent-hover))',
    },
    syntax: {
      keyword: 'hsl(var(--syntax-keyword))',
      string: 'hsl(var(--syntax-string))',
      function: 'hsl(var(--syntax-function))',
      comment: 'hsl(var(--syntax-comment))',
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
  },

  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans)',
      mono: 'var(--font-geist-mono)',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgb(var(--accent-primary) / 0.3)',
  },

  animation: {
    duration: {
      fast: '150ms',
      base: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
} as const;
