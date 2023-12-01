import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/server/_app'

/**
 * trpc 后端路由接口
 * @param req
 * @returns
 */
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
