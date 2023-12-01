import { createTRPCReact } from '@trpc/react-query'

import { type AppRouter } from '@/server/_app'

export const ClientTRPC = createTRPCReact<AppRouter>({})
