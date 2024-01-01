/**
 * this file is where you define your trpc router and context. it is imported by the server and
 */

import { TRPCError, initTRPC } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { type Session } from 'next-auth'
import superjson from 'superjson'
import { getServerAuthSession } from './auth'
type CreateInnerTRPContext = {
  session: Session | null
}

const createInnerTRPCcontext = (opts: CreateInnerTRPContext) => {
  return {
    session: opts.session,
  }
}

/**
 * this is the actual context you will use in your router. it will be used to process every request
 * that goes through your trpc endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  // get the session from the server using the getserversession wrapper function
  const session = await getServerAuthSession({ req, res })

  return createInnerTRPCcontext({
    session,
  })
}
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

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
