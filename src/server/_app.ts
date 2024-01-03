import { mergeRouters } from '@/server/trpc'
import { ArticleRoute } from './trpc/router/article-router'
import { CategoryRoute } from './trpc/router/category-router'
import { OperationLogRouter } from './trpc/router/operation-log'

export const appRouter = mergeRouters(
  ArticleRoute,
  CategoryRoute,
  OperationLogRouter
)
export type AppRouter = typeof appRouter
