'use client'
import { OnUpdateParam, TipTapEditor } from '@/components'
import { useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import { isCuid } from '@paralleldrive/cuid2'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Write() {
  const { id } = useParams<{ id: string }>()
  const [articleContent, setArticleContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const updateArticleTitleById = useSidebarStore.use.updateArticleTitleById()

  const currentArticle = ClientTRPC.getArticleById.useQuery({
    id,
  })

  useEffect(() => {
    if (currentArticle.data) {
      const { title, content } = currentArticle.data
      if (title) {
        setTitle(title)
      }
      if (content) {
        setArticleContent(content)
      }
    }
  }, [])

  const onUpdateDebounce = (value: OnUpdateParam) => {
    if (id && isCuid(id)) {
      updateArticleTitleById(id, value.title)
    }
  }

  return currentArticle.isLoading ? (
    <>loading</>
  ) : (
    <TipTapEditor
      onUpdateDebounce={onUpdateDebounce}
      defaultTitle={title}
      defaultContent={articleContent}
    ></TipTapEditor>
  )
}
