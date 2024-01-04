import { db } from '@/server/db'
import { operationLog } from '@/server/db/schema'
import { protectedProcedure, publicProcedure, router } from '@/server/trpc'
import { count, desc } from 'drizzle-orm'
import z from 'zod'

export const OperationLogRouter = router({
  getLogByPagination: protectedProcedure
    .input(
      z.object({
        current: z.number().default(1),
        size: z.number().default(50),
      })
    )
    .mutation(async ({ input: { current, size } }) => {
      const limit = size + 1
      return db.transaction(async () => {
        const data = await db
          .select()
          .from(operationLog)
          .limit(limit)
          .offset((current - 1) * size)
          .orderBy(desc(operationLog.created_at))

        const total = await db
          .select({ value: count(operationLog.id) })
          .from(operationLog)
        return {
          current,
          size,
          total: total[0].value,
          data,
        }
      })
    }),
  insertLog: publicProcedure
    .input(
      z.object({
        level: z.string(),
        message: z.string(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ input: { level, message, user_id } }) => {
      return db.insert(operationLog).values({
        level,
        message,
        user_id,
      })
    }),
})
