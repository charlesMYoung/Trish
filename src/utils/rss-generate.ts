'use server'

import { db } from '@/server/db'
import fs from 'fs'
import path from 'path'
import RSS from 'rss'

export default async function generateRssFeed() {
  const site_url = process.env.SITE_URL || ''

  const feedOptions = {
    title: 'cyatime | RSS Feed',
    description: 'Welcome to this blog posts!',
    site_url: site_url,
    feed_url: `${process.env.SITE_URL}/rss.xml`,
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
  })

  // Add each individual post to the feed.
  articles.map((post) => {
    feed.item({
      title: post.title || '',
      description: post.description || '',
      url: `${site_url}/post/${post.id}`,
      date: post.release_date || new Date(),
    })
  })

  // Write the RSS feed to a file as XML.
  fs.writeFileSync(
    path.join(process.cwd(), 'public/rss.xml'),
    feed.xml({ indent: true })
  )
}
