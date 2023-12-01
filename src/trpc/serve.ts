import { httpBatchLink } from '@trpc/client'

import { appRouter } from '@/server/_app'

export const ServeTRPC = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})
