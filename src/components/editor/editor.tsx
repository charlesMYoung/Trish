'use client'

import { useEditor } from '~/hooks'
import { useDebounceFn } from 'ahooks'
import { Cover } from '../cover/cover'
import { TitleInput } from './titleInput'
import { api } from '~/trpc/react'

export type EditorProps = {
  defaultContent?: string
  title?: string
  readOnly?: boolean
  coverUrl?: string
  articleId: string
  onTitle?: (title: string) => void
  onCover?: (coverUrl: string) => void
  onContent?: (content: string) => void
}

const Editor = ({
  defaultContent = '',
  articleId,
  coverUrl,
  title,
  readOnly = false,
  onTitle,
  onCover,
  onContent,
}: EditorProps) => {
  const { run: onEditHandle } = useDebounceFn(async (value) => {
    onContent && onContent(value)
  })

  const { mutate } = api.article.mutationCoverList.useMutation({
    onSuccess: (unsplashData) => {
      console.log(unsplashData)
      if (unsplashData) {
        const [firstData] = Array.isArray(unsplashData) ? unsplashData : []
        if (firstData?.urls) {
          onCover && onCover(firstData.urls.regular)
        }
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { editorRef } = useEditor({
    readOnly: readOnly,
    id: articleId,
    onChange: (content) => {
      onEditHandle(content)
    },
    defaultContent,
  })

  return (
    <>
      <Cover onChange={onCover} value={coverUrl} readOnly={readOnly} />
      <TitleInput
        readOnly={readOnly}
        value={title}
        onChange={onTitle}
        coverUrl={coverUrl}
        onAddCoverPress={() => {
          mutate()
        }}
      />
      <div
        tabIndex={0}
        ref={editorRef}
        className="dark-mode container prose prose-sm mx-auto sm:prose
        lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert focus:outline-none"
      ></div>
    </>
  )
}
export default Editor
