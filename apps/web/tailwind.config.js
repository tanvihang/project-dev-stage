/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
