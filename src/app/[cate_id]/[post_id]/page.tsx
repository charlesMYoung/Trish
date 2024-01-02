'use client'

import { Editor } from '@/components'
import { trpc } from '@/utils/trpc-client'
import { Skeleton } from '@nextui-org/react'
import { useEffect } from 'react'

export default function Post({
  params,
}: {
  params: { cate_id: string; post_id: string }
}) {
  const { cate_id, post_id } = params || []

  const {
    data: currentArticle,
    mutate: getArticleByCateIdAndId,
    isLoading,
  } = trpc.getArticleByCateIdAndId.useMutation()

  useEffect(() => {
    getArticleByCateIdAndId({
      id: post_id,
      cateId: cate_id,
    })
  }, [])

  const onTitleHandle = (title: string) => {
    console.log('title', title)
  }

  const onContentHandle = (content: string) => {}

  return isLoading ? (
    <div className="flex flex-col space-y-2">
      <Skeleton className="flex h-64 w-full rounded-lg" />
      <Skeleton className="flex h-20 w-72 rounded-lg" />
      <Skeleton className=" flex h-screen w-full rounded-lg" />
    </div>
  ) : (
    <Editor
      articleId={post_id}
      onTitle={onTitleHandle}
      onContent={onContentHandle}
      onCover={() => {}}
      coverUrl={
        currentArticle?.images.find((img) => img.type === 'COVER')?.url || ''
      }
      title={currentArticle?.title || ''}
      defaultContent={currentArticle?.content || ''}
    ></Editor>
  )
}
