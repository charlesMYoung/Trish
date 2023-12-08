import { db } from '@/db'
import { queryCoverByArticleId } from '@/db/prepared'
import { article, category, image } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  upsetArticle: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().max(100),
        content: z.string().default(''),
        coverUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input: { id, title, content, coverUrl } }) => {
      return db.transaction(async (tx) => {
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
            console.trace('upsetArticle error', error)
            await tx.rollback()
          })

        const covers = await queryCoverByArticleId.execute({
          id,
        })

        if (covers.length === 0) {
          await db.insert(image).values({
            url: coverUrl,
            type: 'COVER',
            article_id: id,
          })
        } else {
          await db
            .update(image)
            .set({
              url: coverUrl,
              type: 'COVER',
              modified_at: new Date(),
            })
            .where(eq(image.id, covers[0].id))
        }
        return articleResult
      })
    }),

  getAllCategory: publicProcedure.query(() => {
    return db.query.category.findMany()
  }),

  upsertCategory: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input: { name } }) => {
      return db
        .insert(category)
        .values({
          name,
        })
        .onConflictDoUpdate({
          target: category.name,
          set: {
            name,
          },
        })
        .returning({
          id: category.id,
        })
    }),
})

export type AppRouter = typeof appRouter
