import { mergeRouters } from '@/server/trpc'
import { ArticleRoute } from './article-router'
import { CategoryRoute } from './category-router'

export const appRouter = mergeRouters(ArticleRoute, CategoryRoute)
export type AppRouter = typeof appRouter
