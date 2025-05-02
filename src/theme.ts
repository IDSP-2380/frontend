// theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'var(--opensans)',
  headings: {
    fontFamily: 'var(--merriweather)',
    fontWeight: 'var(--font-weight-bold)',
    sizes: {
      h1: { fontSize: 'var(--font-size-XXL)', lineHeight: 'var(--font-line-height-XL)' },
      h2: { fontSize: 'var(--font-size-XL)', lineHeight: 'var(--font-line-height-L)' },
      h3: { fontSize: 'var(--font-size-L)', lineHeight: 'var(--font-line-height-M)' },
      h4: { fontSize: 'var(--font-size-M)', lineHeight: 'var(--font-line-height-S)' },
      h5: { fontSize: 'var(--font-size-S)', lineHeight: 'var(--font-line-height-XS)' },
      h6: { fontSize: 'var(--font-size-XS)', lineHeight: 'var(--font-line-height-XS)' },
    },
  },

  colors: {
    brand: [
      'var(--primary-50)',
      'var(--primary-100)',
      'var(--primary-200)',
      'var(--primary-300)',
      'var(--primary-400)',
      'var(--primary-500)', 
      'var(--primary-600)',
      'var(--primary-700)',
      'var(--primary-800)',
      'var(--primary-900)',
    ],
    gray: [
      'var(--neutral-200)',
      'var(--neutral-300)',
      'var(--neutral-400)',
      'var(--neutral-500)',
      'var(--neutral-600)',
      'var(--neutral-700)',
      'var(--neutral-800)',
      'var(--neutral-900)',
      '#000000',
      '#111111',
      '#222222',
    ],
  },

  primaryColor: 'brand',

  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },

  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
});
