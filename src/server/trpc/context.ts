import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerAuthSession } from './next-auth'

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getServerAuthSession()
  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
