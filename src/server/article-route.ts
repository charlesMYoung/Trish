import { db } from '@/db'
import { queryCoverByArticleId } from '@/db/prepared'
import { article, image } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure, router } from './trpc'

export const ArticleRoute = router({
  getArticleById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input: { id } }) => {
      return db.query.article.findFirst({
        where: (article, { eq }) => eq(article.id, id),
      })
    }),

  getArticleByCateIdAndId: publicProcedure
    .input(
      z.object({
        id: z.string(),
        cateId: z.string(),
      })
    )
    .query(({ input: { id, cateId } }) => {
      return db.query.article.findFirst({
        where: (article, { eq, and }) => {
          return and(eq(article.category_id, cateId), eq(article.id, id))
        },
      })
    }),

  updateArticleTitleByTitle: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      })
    )
    .mutation(({ input: { id, title } }) => {
      return db
        .update(article)
        .set({
          title,
        })
        .where(eq(article.id, id))
    }),

  updateArticleContent: publicProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ input: { id, content } }) => {
      return db
        .update(article)
        .set({
          content,
        })
        .where(eq(article.id, id))
    }),

  insertArticle: publicProcedure
    .input(
      z.object({
        id: z.string(),
        cateId: z.string(),
      })
    )
    .mutation(({ input: { id, cateId } }) => {
      return db.insert(article).values({
        id,
        category_id: cateId,
      })
    }),
  upsetArticle: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().max(100),
        content: z.string().default(''),
        coverUrl: z.string().optional(),
        categoryId: z.string().optional(),
      })
    )
    .mutation(
      async ({ input: { id, title, content, coverUrl, categoryId } }) => {
        return db.transaction(async (tx) => {
          const articleResult = await db
            .insert(article)
            .values({
              id,
              title,
              content,
              category_id: categoryId,
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
      }
    ),

  getArticleByCateId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input: { id } }) => {
      return db.query.article.findMany({
        where: (article, { eq }) => eq(article.category_id, id),
      })
    }),
})
