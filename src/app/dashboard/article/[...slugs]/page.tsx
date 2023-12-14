'use client'
import { TipTapEditor } from '@/components'
import { useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
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

  const onTitleHandle = (title: string) => {
    updateArticleTitleById(title, {
      articleId,
      cateId,
    })
  }

  return isLoading ? (
    <div>loading</div>
  ) : (
    <TipTapEditor
      onTitle={onTitleHandle}
      onContent={() => {}}
      onCover={() => {}}
      defaultTitle={currentArticle?.content || ''}
      defaultContent={currentArticle?.title || ''}
    ></TipTapEditor>
  )
}
