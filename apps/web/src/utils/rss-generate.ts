'use server'

import fs from 'fs'
import path from 'path'
import RSS from 'rss'
import { db } from '~/server/db'

export default async function generateRssFeed() {
  const site_url = process.env.SITE_URL ?? ''

  const feedOptions = {
    title: 'cyatime | RSS Feed',
    description: '这里记录我的成长',
    site_url: site_url,
    feed_url: `${process.env.SITE_URL}/feed.xml`,
    image_url: `${process.env.SITE_URL}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  }

  const feed = new RSS(feedOptions)

  const articles = await db.query.article.findMany({
    columns: {
      id: true,
      title: true,
      description: true,
      release_date: true,
    },
    where(fields, operators) {
      return operators.and(operators.eq(fields.is_release, true))
    },
  })

  articles.map((post) => {
    feed.item({
      title: post.title ?? '',
      description: post.description ?? '',
      url: `${site_url}/blog/post/${post.id}`,
      date: post.release_date ?? new Date(),
    })
  })

  // Write the RSS feed to a file as XML.
  fs.writeFileSync(
    path.join(process.cwd(), 'public/feed.xml'),
    feed.xml({ indent: true })
  )
}
