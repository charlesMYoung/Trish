import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { Pool } from 'pg'
import * as schema from './schema'

const {
  DB_HOST = '',
  DB_PORT = 0,
  DB_USER,
  DB_PASSWORD = '',
  DB_DATABASE = '',
} = process.env

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT as number,
  database: DB_DATABASE,
})
const db = drizzle(pool, { schema, logger: false })
await migrate(db, {
  migrationsFolder: 'drizzle',
})

export { db }
