import Editor from '@/components/editor/editor'
import { trpc } from '@/utils/trpc-rsc'
import { Metadata } from 'next'

async function getHomeArticle() {
  const data = await trpc.getHomeArticle()
  return data
}
//HACK: force-dynamic to force re-generate metadata
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const product = await getHomeArticle()
  return {
    title: product?.title,
  }
}

export default async function Home() {
  const homeData = await getHomeArticle()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Editor
        readOnly
        articleId={''}
        title={homeData?.title || ''}
        defaultContent={homeData?.content || ''}
      ></Editor>
    </main>
  )
}
