'use client'

import Editor from '@/components/editor/editor'
import { useSidebarStore } from '@/hooks'
import { trpc } from '@/utils/trpc-client'
import { Skeleton } from '@nextui-org/react'
import { useDebounceFn } from 'ahooks'
import { useEffect, useMemo, useState } from 'react'

export default function ArticlePage({
  params,
}: {
  params: { slugs: string[] }
}) {
  const [cateId, articleId] = params.slugs || []
  const [title, setTitle] = useState<string>('')
  const [coverUrl, setCoverUrl] = useState<string>('')
  const utils = trpc.useUtils()

  const updateArticleTitleById = useSidebarStore.use.updateArticleTitleById()

  const { mutate: updateArticleCover } = trpc.updateArticleCover.useMutation({
    onSuccess() {
      utils.client.getArticleByCateIdAndId.mutate({
        id: articleId,
        cateId,
      })
    },
  })

  const {
    data: currentArticle,
    mutate: getArticleByCateIdAndId,
    isLoading,
  } = trpc.getArticleByCateIdAndId.useMutation()

  const { mutate: updateArticleTitleByTitle } =
    trpc.updateArticleTitleByTitle.useMutation({})

  const { mutate: updateArticleContent } =
    trpc.updateArticleContent.useMutation({})

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

  const defaultCoverUrl = useMemo(() => {
    return currentArticle?.images.find((img) => img.type === 'COVER')?.url || ''
  }, [currentArticle])

  console.log('defaultCoverUrl', defaultCoverUrl)

  const onTitleHandle = (title: string) => {
    updateArticleTitleById(title, {
      articleId,
      cateId,
    })
    setTitle(title)
    updateArticleTitleByTitleDebounce({
      title,
      id: articleId,
    })
  }

  const onContentHandle = (content: string) => {
    updateArticleContentDebounce({
      content,
      id: articleId,
    })
  }

  const onCoverHandle = (coverUrl: string) => {
    setCoverUrl(coverUrl)
    updateArticleCover({
      articleId,
      coverUrl,
    })
  }

  return isLoading ? (
    <div className="flex flex-col space-y-2">
      <Skeleton className="flex h-64 w-full rounded-lg" />
      <Skeleton className="flex h-20 w-72 rounded-lg" />
      <Skeleton className=" flex h-screen w-full rounded-lg" />
    </div>
  ) : (
    <Editor
      articleId={articleId}
      onTitle={onTitleHandle}
      onContent={onContentHandle}
      onCover={onCoverHandle}
      coverUrl={coverUrl || defaultCoverUrl}
      title={title || (currentArticle?.title as string)}
      defaultContent={currentArticle?.content || ''}
    ></Editor>
  )
}
