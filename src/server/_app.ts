import { db } from '@/db'
import { z } from 'zod'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  getArticleById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await db.query.article.findFirst({
        where: (article, { eq }) => eq(article.id, input.id),
      })
    }),
})

export type AppRouter = typeof appRouter
