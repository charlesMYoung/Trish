import { count, desc } from 'drizzle-orm'
import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { operationLog } from '~/server/db/schema'

export const OperationLogRouter = createTRPCRouter({
  getLogByPagination: protectedProcedure
    .input(
      z.object({
        current: z.number().default(1),
        size: z.number().default(50),
      })
    )
    .mutation(async ({ input: { current, size },ctx }) => {
      const limit = size + 1
      return ctx.db.transaction(async () => {
        const data = await ctx.db
          .select()
          .from(operationLog)
          .limit(limit)
          .offset((current - 1) * size)
          .orderBy(desc(operationLog.created_at))

        const total = await ctx.db
          .select({ value: count(operationLog.id) })
          .from(operationLog)
        return {
          current,
          size,
          total: total[0]?.value,
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
    .mutation(async ({ input: { level, message, user_id },ctx }) => {
      return ctx.db.insert(operationLog).values({
        level,
        message,
        user_id,
      })
    }),
})
