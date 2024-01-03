import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/server/db/schema.ts',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    user: 'postgres',
    password: '123456',
    host: '127.0.0.1',
    database: 'postgres',
  },
  verbose: true,
  strict: true,
})
