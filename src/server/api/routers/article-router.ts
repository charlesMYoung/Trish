import { and, count, eq } from 'drizzle-orm'
import { createApi } from 'unsplash-js'
import { z } from 'zod'
import { queryCoverByArticleId } from '~/server/db/prepare'
import { article, image } from '~/server/db/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const ArticleRoute = createTRPCRouter({
  getArticleById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input: { id }, ctx }) => {
      return ctx.db.query.article.findFirst({
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
    .mutation(({ input: { id, cateId }, ctx }) => {
      return ctx.db.query.article.findFirst({
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
    .mutation(({ input: { id, title }, ctx }) => {
      return ctx.db
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
    .mutation(({ input: { id, content }, ctx }) => {
      return ctx.db
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
    .mutation(({ input: { id, cateId }, ctx }) => {
      return ctx.db.insert(article).values({
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
      async ({ input: { id, title, content, coverUrl, categoryId }, ctx }) => {
        return ctx.db.transaction(async (tx) => {
          const articleResult = await ctx.db
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
              tx.rollback()
            })

          const covers = await queryCoverByArticleId.execute({
            id,
          })

          if (covers.length === 0) {
            await ctx.db.insert(image).values({
              url: coverUrl,
              type: 'COVER',
              article_id: id,
            })
          } else {
            await ctx.db
              .update(image)
              .set({
                url: coverUrl,
                type: 'COVER',
                modified_at: new Date(),
              })
              .where(eq(image.id, covers[0]?.id ?? ''))
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
    .mutation(({ input: { id }, ctx }) => {
      return ctx.db.query.article.findMany({
        columns: {
          category_id: true,
          title: true,
          id: true,
          created_at: true,
          modified_at: true,
          is_release: true,
          release_date: true,
        },
        where: (article, { eq }) => eq(article.category_id, id),
      })
    }),

  delArticleById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input: { id }, ctx }) => {
      return ctx.db.delete(article).where(eq(article.id, id))
    }),

  countArticle: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select({ value: count(article.id) })
      .from(article)
      .then((resp) => resp[0]?.value)
  }),

  updateArticleCover: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
        coverUrl: z.string(),
      })
    )
    .mutation(async ({ input: { articleId, coverUrl }, ctx }) => {
      return ctx.db.transaction(async (tx) => {
        const covers = await queryCoverByArticleId
          .execute({
            id: articleId,
          })
          .catch(async (error) => {
            console.error('error', error)
            tx.rollback()
            return []
          })

        if (coverUrl === '') {
          await ctx.db
            .delete(image)
            .where(
              and(eq(image.article_id, articleId), eq(image.type, 'COVER'))
            )
          return {}
        }

        if (covers.length === 0) {
          await ctx.db.insert(image).values({
            url: coverUrl,
            type: 'COVER',
            article_id: articleId,
          })
        } else {
          await ctx.db
            .update(image)
            .set({
              url: coverUrl,
              type: 'COVER',
              modified_at: new Date(),
            })
            .where(eq(image.id, covers[0]?.id ?? ''))
            .catch(async (error) => {
              console.error('error', error)
              tx.rollback()
            })
        }
        return {}
      })
    }),

  getCoverList: protectedProcedure.query(() => {
    const serverApi = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    })
    return serverApi.photos
      .getRandom({
        count: 30,
      })
      .then((resp) => resp.response)
      .catch((error) => {
        console.error('error', error)
      })
  }),

  mutationCoverList: protectedProcedure.mutation(() => {
    const serverApi = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    })
    return serverApi.photos
      .getRandom({
        count: 30,
      })
      .then((resp) => {
        return resp.response
      })
      .catch((error) => {
        console.error('error', error)
      })
  }),

  getHomeArticle: publicProcedure.mutation(({ ctx }) => {
    return ctx.db.query.article.findFirst({
      columns: {
        id: true,
        title: true,
        content: true,
        is_release: true,
        created_at: true,
        modified_at: true,
      },
      where: (article, { eq }) => eq(article.category_id, 'HOME'),
    })
  }),

  upsertHomeArticleTitle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ input: { title }, ctx }) => {
      return ctx.db.transaction(async (tx) => {
        const resp = await ctx.db
          .select()
          .from(article)
          .where(eq(article.category_id, 'HOME'))
          .catch(async (error) => {
            console.error('error', error)
            tx.rollback()
          })

        if (resp && resp.length === 0) {
          return ctx.db
            .insert(article)
            .values({
              title,
              category_id: 'HOME',
            })
            .returning({
              title: article.title,
            })
        } else {
          return ctx.db
            .update(article)
            .set({
              title,
            })
            .where(eq(article.category_id, 'HOME'))
            .returning({
              title: article.title,
            })
        }
      })
    }),

  updateHomeArticleContent: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(({ input: { content }, ctx }) => {
      return ctx.db
        .update(article)
        .set({
          content,
        })
        .where(eq(article.category_id, 'HOME'))
    }),
})
