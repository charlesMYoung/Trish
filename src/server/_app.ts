import { mergeRouters } from '@/server/trpc'
import { ArticleRoute } from './trpc/router/article-router'
import { CategoryRoute } from './trpc/router/category-router'

export const appRouter = mergeRouters(ArticleRoute, CategoryRoute)
export type AppRouter = typeof appRouter
