import { mkdirIfNotPath } from '@/utils/file-common'
import { createId } from '@paralleldrive/cuid2'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import puppeteer, { Browser, Page } from 'puppeteer'

async function getWebsiteInfo(page: Page) {
  try {
    const titleElement = await page.waitForSelector('title')
    const gameName =
      (await page.evaluate((name) => name?.innerText, titleElement)) || ''
    const metaDescElement = await page.waitForSelector(
      'meta[name="description"]'
    )

    const getMetaDesc =
      (await page.evaluate(
        (name) => name?.getAttribute('content'),
        metaDescElement
      )) || ''

    await titleElement?.dispose()
    await metaDescElement?.dispose()
    return {
      title: gameName,
      description: getMetaDesc,
    }
  } catch (error) {
    console.error('[getWebsiteInfo] error = ', error)
  }
  return {
    title: '',
    description: '',
  }
}

async function getWebShot(
  {
    url,
    linkImagePath,
    fileName,
  }: {
    url: string
    linkImagePath: string
    fileName: string
  },
  page: Page
) {
  const fullFileNamePath = path.join(linkImagePath, fileName)
  try {
    await page.goto(url)
    await page.screenshot({
      path: fullFileNamePath,
    })
  } catch (error) {
    console.error('[getWebShot] error = ', error)
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url') as string
  const id = request.headers.get('X-ARTICLE-ID') as string

  const fileName = `${createId()}_link.png`

  let browser: Browser

  const linkImagePath = path.join(
    process.cwd(),
    'public',
    'media',
    id as string,
    'LINK'
  )

  mkdirIfNotPath(linkImagePath)

  let title = ''
  let description = ''

  try {
    browser = await puppeteer.launch({
      defaultViewport: {
        width: 1280,
        height: 400,
      },
      headless: 'new',
    })
    const page = await browser.newPage()
    await getWebShot(
      {
        url,
        linkImagePath,
        fileName,
      },
      page
    )
    const websiteInfo = await getWebsiteInfo(page)
    title = websiteInfo.title
    description = websiteInfo.description
    await browser.close()
  } catch (e) {
    console.error('open browser in not open by puppeteer')
  } finally {
  }

  return NextResponse.json({
    success: 1,
    meta: {
      title: title,
      description,
      image: {
        url: 'http://localhost:3000/media/' + id + '/LINK/' + fileName,
      },
    },
  })
}
