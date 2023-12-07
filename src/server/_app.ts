import { db } from '@/db'
import { queryCoverbyArticleId } from '@/db/prepared'
import { article, image } from '@/db/schema'
import { eq } from 'drizzle-orm'
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
        where: (articles, { eq }) => eq(articles.id, input.id),
      })
    }),

  upsetAritcle: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().max(100),
        content: z.string().default(''),
        coverUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input: { id, title, content, coverUrl } }) => {
      db.transaction(async (tx) => {
        const articleResult = await db
          .insert(article)
          .values({
            id,
            title,
            content,
            is_release: false,
          })
          .onConflictDoUpdate({
            target: article.id,
            set: {
              title,
              content,
              is_release: false,
              modified_at: new Date(),
            },
          })
          .returning({
            id: article.id,
          })
          .catch(async (error) => {
            console.trace('upsetAritcle error', error)
            await tx.rollback()
          })

        const covers = await queryCoverbyArticleId.execute({
          id,
        })

        if (covers.length === 0) {
          await db.insert(image).values({
            url: coverUrl,
            type: 'cover',
          })
        } else {
          await db
            .update(image)
            .set({
              url: coverUrl,
              type: 'cover',
              modified_at: new Date(),
            })
            .where(eq(image.id, covers[0].id))
        }
        return articleResult
      })
    }),
})

export type AppRouter = typeof appRouter
