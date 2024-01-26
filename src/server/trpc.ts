/**
 * this file is where you define your trpc router and context. it is imported by the server and
 */

import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './trpc/context'

/**
 * 初始化 trpc
 */
const t = initTRPC.context<Context>().create()
//   {
//   transformer: superjson,
//   errorFormatter({ shape }) {
//     return shape
//   },
// }

/** reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * protected (authenticated) procedure
 *
 * if you want a query or mutation to only be accessible to logged in users, use this. it verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

export const publicProcedure = t.procedure

export const router = t.router

export const mergeRouters = t.mergeRouters

export const createCallerFactory = t.createCallerFactory
