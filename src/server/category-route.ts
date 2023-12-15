import { db } from '@/db'
import { category } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure, router } from './trpc'

export const CategoryRoute = router({
  getAllCategory: publicProcedure.query(() => {
    return db.query.category.findMany({
      columns: {
        id: true,
        name: true,
      },
      orderBy(fields, operators) {
        return operators.asc(fields.created_at)
      },
    })
  }),

  updateCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ input: { id, name } }) => {
      return db
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

  deleteCategoryById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input: { id } }) => {
      return db.delete(category).where(eq(category.id, id)).returning({
        id: category.id,
        name: category.name,
      })
    }),

  insertCategory: publicProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string(),
      })
    )
    .mutation(({ input: { name } }) => {
      return db
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
