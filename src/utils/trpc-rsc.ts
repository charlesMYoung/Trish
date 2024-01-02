import { appRouter } from '@/server/_app'
import { httpBatchLink } from '@trpc/client'

export const trpc = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: process.env.TRPC_SERVER_URL as string,
    }),
  ],
})
