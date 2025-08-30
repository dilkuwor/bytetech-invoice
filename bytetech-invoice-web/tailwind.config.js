// tailwind.config.cjs (ESM)
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media'
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        green: { 100: '#d1fae5', 300: '#6ee7b7', 700: '#047857', 900: '#064e3b' },
        yellow: { 100: '#fef3c7', 300: '#fcd34d', 700: '#d97706', 900: '#78350f' },
        red: { 100: '#fee2e2', 300: '#f87171', 400: '#ef4444', 600: '#dc2626', 900: '#991b1b' },
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
      spacing: { 15: '3.75rem', 18: '4.5rem' },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
      transitionProperty: {
        width: 'width',
        colors:
          'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionDuration: { 200: '200ms', 300: '300ms' },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const utilities = {
        /* Firefox */
        '.scrollbar-thin': { 'scrollbar-width': 'thin' },

        /* WebKit */
        '.scrollbar-thin::-webkit-scrollbar': { width: '8px', height: '8px' },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: '#f3f4f6',
          'border-radius': '4px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: '#8b5cf6',
          'border-radius': '4px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#7c3aed',
        },

        /* Dark mode versions */
        '.dark .scrollbar-thin::-webkit-scrollbar-track': {
          background: '#1f2937',
        },
        '.dark .scrollbar-thin::-webkit-scrollbar-thumb': {
          background: '#7c3aed',
        },
        '.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#6d28d9',
        },
      };
      addUtilities(utilities);
    }),
  ],
};