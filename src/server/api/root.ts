import { createTRPCRouter } from "~/server/api/trpc";
import { ArticleRoute } from "./routers/article-router";
import { CategoryRoute } from './routers/category-router';
import { OperationLogRouter } from "./routers/operation-log";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  article: ArticleRoute,
  category: CategoryRoute,
  log: OperationLogRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
