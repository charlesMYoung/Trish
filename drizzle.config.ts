import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    user: '',
    password: '',
    host: '',
    database: '',
  },
  verbose: true,
  strict: true,
})
