import { ArticleRoute } from './article-route'
import { CategoryRoute } from './category-route'
import { mergeRouters } from './trpc'

export const appRouter = mergeRouters(ArticleRoute, CategoryRoute)
export type AppRouter = typeof appRouter
