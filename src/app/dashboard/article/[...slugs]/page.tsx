'use client'
import { TipTapEditor } from '@/components'
import { useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import { Skeleton } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export default function ArticlePage() {
  const { slugs } = useParams<{ slugs: string[] }>()

  const [cateId, articleId] = slugs

  if (slugs.length > 2) {
    return <>route param is error</>
  }

  const updateArticleTitleById = useSidebarStore.use.updateArticleTitleById()

  const { data: currentArticle, isLoading } =
    ClientTRPC.getArticleByCateIdAndId.useQuery({
      cateId,
      id: articleId,
    })

  const { mutate: updateArticleTitleByTitle } =
    ClientTRPC.updateArticleTitleByTitle.useMutation({})

  const { mutate: updateArticleContent } =
    ClientTRPC.updateArticleContent.useMutation({})

  const onTitleHandle = (title: string) => {
    console.log('title', title)
    updateArticleTitleById(title, {
      articleId,
      cateId,
    })
    updateArticleTitleByTitle({
      title,
      id: articleId,
    })
  }

  const onContentHandle = (content: string) => {
    console.log('content', content)
    updateArticleContent({
      content,
      id: articleId,
    })
  }

  return isLoading ? (
    <div className="flex flex-col space-y-2">
      <Skeleton className="flex h-64 w-full rounded-lg" />
      <Skeleton className="flex h-20 w-72 rounded-lg" />
      <Skeleton className=" flex h-screen w-full rounded-lg" />
    </div>
  ) : (
    <TipTapEditor
      onTitle={onTitleHandle}
      onContent={onContentHandle}
      onCover={() => {}}
      defaultTitle={currentArticle?.title || ''}
      defaultContent={currentArticle?.content || ''}
    ></TipTapEditor>
  )
}
