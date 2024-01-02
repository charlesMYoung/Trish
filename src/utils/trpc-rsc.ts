import { appRouter } from '@/server/_app'
import { getServerAuthSession } from '@/server/trpc/next-auth'

const session = await getServerAuthSession()
export const trpc = appRouter.createCaller({
  session,
})
