import { nextui } from '@nextui-org/react'
import Typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import CusTypography from './tailwind.theme'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui(), Typography, CusTypography],
} satisfies Config;
