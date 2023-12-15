'use client'
import { TipTapEditor } from '@/components'
import { useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import { Skeleton } from '@nextui-org/react'
import { useDebounceFn } from 'ahooks'
import { useEffect } from 'react'

export default function ArticlePage({
  params,
}: {
  params: { slugs: string[] }
}) {
  const [cateId, articleId] = params.slugs || []

  const updateArticleTitleById = useSidebarStore.use.updateArticleTitleById()

  const {
    data: currentArticle,
    mutate: getArticleByCateIdAndId,
    isLoading,
  } = ClientTRPC.getArticleByCateIdAndId.useMutation()

  const { mutate: updateArticleTitleByTitle } =
    ClientTRPC.updateArticleTitleByTitle.useMutation({})

  const { mutate: updateArticleContent } =
    ClientTRPC.updateArticleContent.useMutation({})

  const { run: updateArticleTitleByTitleDebounce } = useDebounceFn(
    updateArticleTitleByTitle
  )

  const { run: updateArticleContentDebounce } =
    useDebounceFn(updateArticleContent)

  useEffect(() => {
    getArticleByCateIdAndId({
      id: articleId,
      cateId,
    })
  }, [])

  const onTitleHandle = (title: string) => {
    console.log('title', title)
    updateArticleTitleById(title, {
      articleId,
      cateId,
    })
    updateArticleTitleByTitleDebounce({
      title,
      id: articleId,
    })
  }

  const onContentHandle = (content: string) => {
    console.log('content', content)
    updateArticleContentDebounce({
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
