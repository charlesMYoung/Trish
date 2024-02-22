import NextIntl from 'next-intl/plugin'
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: '*.unsplash.com',
      },
    ],
  },
}
const withNextIntl = NextIntl()
export default withNextIntl(config)
