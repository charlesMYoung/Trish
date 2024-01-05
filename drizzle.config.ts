import { defineConfig } from 'drizzle-kit'

const {
  DB_HOST = '',
  DB_PORT = 0,
  DB_USER,
  DB_PASSWORD = '',
  DB_DATABASE,
} = process.env
export default defineConfig({
  schema: './src/server/db/schema.ts',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    user: DB_USER,
    password: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT as number,
    database: DB_PASSWORD,
  },
  verbose: true,
  strict: true,
})
