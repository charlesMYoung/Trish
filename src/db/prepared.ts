import { db } from '@/db'
import { sql } from 'drizzle-orm'

export const queryCoverByArticleId = db.query.image
  .findMany({
    where: (img, { eq, and }) =>
      and(eq(img.article_id, sql.placeholder('id')), eq(img.type, 'COVER')),
  })
  .prepare('query_cover_by_article_id')
