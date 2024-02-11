import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Editor from "~/components/editor/editor";
import { api } from "~/trpc/server";

async function getHomeArticle() {
  const data = await api.article.getHomeArticle.mutate();
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

