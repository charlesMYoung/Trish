import { httpBatchLink } from '@trpc/client'

import { appRouter } from '@/server/_app'

export const ServeTRPC = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: process.env.TRPC_SERVER_URL as string,
    }),
  ],
})
