'use server'

import { appRouter } from '@/server/_app'
import { getServerAuthSession } from '@/server/trpc/next-auth'

export const trpc = appRouter.createCaller({
  session: await getServerAuthSession(),
})
