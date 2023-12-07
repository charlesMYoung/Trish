import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const postImageType = pgEnum('cover', ['CONTENT', 'AVATAR', 'COIVER'])

export const article = pgTable('t_blog_article', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  title: varchar('title', {
    length: 100,
  }),
  description: text('description'),
  is_release: boolean('is_release').default(false),
  content: text('content'),
  release_date: timestamp('release_date').defaultNow(),
  created_at: timestamp('created_at').defaultNow(),
  modified_at: timestamp('modified_at').defaultNow(),

  category_id: varchar('category_id'),
})

export const articleRelation = relations(article, ({ one, many }) => ({
  category: one(category, {
    fields: [article.category_id],
    references: [category.id],
  }),
  images: many(image),
  articleToTag: many(articleToTag),
}))

export const image = pgTable('t_blog_image', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', {
    length: 100,
  }),
  url: varchar('url', {
    length: 256,
  }),
  path: varchar('path', {
    length: 256,
  }),
  type: postImageType('cover'),
  created_at: timestamp('created_at').defaultNow(),
  modified_at: timestamp('modified_at').defaultNow(),

  article_id: varchar('article_id'),
})

export const imageRelation = relations(image, ({ one }) => ({
  article: one(article, {
    fields: [image.article_id],
    references: [article.id],
  }),
}))

export const category = pgTable('t_blog_category', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', {
    length: 100,
  }),
  created_at: timestamp('created_at').defaultNow(),
  modified_at: timestamp('modified_at').defaultNow(),
})

export const categoryRelation = relations(category, ({ many }) => ({
  articles: many(article),
}))

export const tag = pgTable('t_blog_tag', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', {
    length: 100,
  }),
  created_at: timestamp('created_at').defaultNow(),
  modified_at: timestamp('modified_at').defaultNow(),
})

export const tagRelation = relations(tag, ({ many }) => ({
  articles: many(articleToTag),
}))

export const articleToTag = pgTable(
  't_blog_article_to_tag',
  {
    article_id: varchar('article_id')
      .notNull()
      .references(() => article.id),
    tag_id: varchar('tag_id')
      .notNull()
      .references(() => tag.id),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.article_id, table.tag_id],
      }),
    }
  }
)

export const articleToTagRelation = relations(articleToTag, ({ one }) => ({
  article: one(article, {
    fields: [articleToTag.article_id],
    references: [article.id],
  }),
  tag: one(tag, {
    fields: [articleToTag.tag_id],
    references: [tag.id],
  }),
}))
