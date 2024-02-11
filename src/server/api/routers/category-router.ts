import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { category } from '~/server/db/schema'

export const CategoryRoute = createTRPCRouter({
  getAllCategory: publicProcedure.query(({ctx}) => {
    return ctx.db.query.category.findMany({
      columns: {
        id: true,
        name: true,
      },
      orderBy(fields, operators) {
        return operators.asc(fields.created_at)
      },
    })
  }),

  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ input: { id, name },ctx }) => {
      return ctx.db
        .update(category)
        .set({
          name,
        })
        .where(eq(category.id, id))
        .returning({
          id: category.id,
          name: category.id,
        })
    }),

  deleteCategoryById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input: { id },ctx }) => {
      return ctx.db.delete(category).where(eq(category.id, id)).returning({
        id: category.id,
        name: category.name,
      })
    }),

  insertCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string(),
      })
    )
    .mutation(({ input: { name },ctx}) => {
      return ctx.db
        .insert(category)
        .values({
          name,
        })
        .returning({
          id: category.id,
          name: category.name,
        })
    }),
})
