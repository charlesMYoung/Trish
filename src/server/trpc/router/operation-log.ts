import { db } from '@/server/db'
import { operationLog } from '@/server/db/schema'
import { protectedProcedure, router } from '@/server/trpc'
import { desc, gt } from 'drizzle-orm'
import z from 'zod'

export const OperationLogRouter = router({
  infiniteOperationLog: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ input: { limit, cursor } }) => {
      limit = limit ?? 50
      const items = await db
        .select()
        .from(operationLog)
        .limit(limit)
        .offset(gt(operationLog.cursor, cursor))
        .orderBy(desc(operationLog.cursor))

      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.cursor
      }
      return {
        items,
        nextCursor,
      }
    }),
})
