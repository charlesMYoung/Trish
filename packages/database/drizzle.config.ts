import { type Config } from 'drizzle-kit'

import { env } from './src/env'

export default {
  schema: './src/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ['trish_*'],
} satisfies Config
