'use client'

import { GalleryList } from '@/config/appConfig'
import { useEditor } from '@/hooks'
import { rangeRadom } from '@/utils/common'
import { useDebounceFn } from 'ahooks'
import { Cover } from '../cover/cover'
import { TitleInput } from './titleInput'

export type EditorProps = {
  defaultContent?: string
  title?: string
  readOnly?: boolean
  coverUrl: string
  articleId: string
  onTitle?: (title: string) => void
  onCover?: (coverUrl: string) => void
  onContent?: (content: string) => void
}

const Editor = ({
  defaultContent = '',
  title = '',
  coverUrl = '',
  articleId,
  readOnly = false,
  onTitle,
  onCover,
  onContent,
}: EditorProps) => {
  const { run: onEditHandle } = useDebounceFn(async (value) => {
    onContent && onContent(value)
  })

  const { editorRef } = useEditor({
    readOnly: readOnly,
    id: articleId,
    onChange: (content) => {
      onEditHandle(content)
    },
    defaultContent,
  })

  const onAddCoverPressHandle = () => {
    const maxLength = GalleryList.length
    const maxRadomIndex = rangeRadom(maxLength) - 1
    const gallery = GalleryList[maxRadomIndex]
    if (gallery && gallery.url) {
      onCover && onCover(gallery.url)
    }
  }

  return (
    <>
      <Cover onChange={onCover} value={coverUrl} />
      <TitleInput
        value={title}
        onChange={onTitle}
        defaultValue={title}
        coverUrl={coverUrl}
        onAddCoverPress={onAddCoverPressHandle}
      />
      <div
        tabIndex={0}
        ref={editorRef}
        className="dark-mode prose prose-sm mx-auto dark:prose-invert 
        sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl focus:outline-none"
      ></div>
    </>
  )
}
export default Editor
