'use server'

import { appRouter } from '@/server/_app'
import { createCallerFactory } from '@/server/trpc'
import { getServerAuthSession } from '@/server/trpc/next-auth'

const caller = createCallerFactory(appRouter)

export const trpc = caller({
  session: await getServerAuthSession(),
})
