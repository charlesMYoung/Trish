import { appRouter } from '@/server/_app'
import { getServerAuthSession } from '@/server/trpc/next-auth'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

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
    createContext: async () => {
      const session = await getServerAuthSession()
      return {
        session,
      }
    },
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            )
          }
        : undefined,
  })

  return result
}

export { handler as GET, handler as POST }
