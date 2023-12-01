import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'db_name',
})
const db = drizzle(pool, { schema })
await migrate(db, {
  migrationsFolder: 'drizzle',
})

export { db }
