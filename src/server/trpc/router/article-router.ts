import { db } from '@/server/db'
import { queryCoverByArticleId } from '@/server/db/prepared'
import { article, image } from '@/server/db/schema'
import { protectedProcedure, publicProcedure, router } from '@/server/trpc'
import { and, count, eq } from 'drizzle-orm'
import { z } from 'zod'

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
    .mutation(({ input: { id, cateId } }) => {
      return db.query.article.findFirst({
        columns: {
          id: true,
          title: true,
          content: true,
          is_release: true,
          created_at: true,
          modified_at: true,
        },
        with: {
          images: true,
        },
        where: (article, { eq, and }) => {
          return and(eq(article.category_id, cateId), eq(article.id, id))
        },
      })
    }),

  updateArticleTitleByTitle: protectedProcedure
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

  updateArticleContent: protectedProcedure
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

  insertArticle: protectedProcedure
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
  upsetArticle: protectedProcedure
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
        columns: {
          category_id: true,
          title: true,
          id: true,
          created_at: true,
          modified_at: true,
          is_release: true,
          content: true,
        },
        with: {
          images: true,
        },
        where: (article, { eq }) => eq(article.category_id, id),
      })
    }),

  delArticleById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input: { id } }) => {
      return db.delete(article).where(eq(article.id, id))
    }),

  countArticle: publicProcedure.query(() => {
    return db
      .select({ value: count(article.id) })
      .from(article)
      .then((resp) => resp[0].value)
  }),

  updateArticleCover: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
        coverUrl: z.string(),
      })
    )
    .mutation(async ({ input: { articleId, coverUrl } }) => {
      return db.transaction(async (tx) => {
        const covers = await queryCoverByArticleId
          .execute({
            id: articleId,
          })
          .catch(async (error) => {
            console.error('error', error)
            await tx.rollback()
            return []
          })

        if (coverUrl === '') {
          await db
            .delete(image)
            .where(
              and(eq(image.article_id, articleId), eq(image.type, 'COVER'))
            )
          return {}
        }

        if (covers.length === 0) {
          await db.insert(image).values({
            url: coverUrl,
            type: 'COVER',
            article_id: articleId,
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
            .catch(async (error) => {
              console.error('error', error)
              await tx.rollback()
            })
        }
        return {}
      })
    }),
})
