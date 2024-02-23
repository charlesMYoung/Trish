import tailwindConfig from '@trish/config-tailwind'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [tailwindConfig],
} satisfies Config
