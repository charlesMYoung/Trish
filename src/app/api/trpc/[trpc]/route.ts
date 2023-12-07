import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/server/_app'

/**
 * trpc 后端路由接口
 * @param req
 * @returns
 */
const handler = async (req: Request) => {
  const result = fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })

  return result
}

export { handler as GET, handler as POST }
