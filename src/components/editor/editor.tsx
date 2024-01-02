'use client'

import { toJSON, toObject } from '@/utils/common'
import Checklist from '@editorjs/checklist'
import CodeTool from '@editorjs/code'
import EditorJS, { OutputBlockData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Image from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import { useDebounceFn } from 'ahooks'
import { useEffect, useRef } from 'react'
import { EditorCover } from './editor-cover'

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
  const editor = useRef<EditorJS | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)

  const { run: onEditHandle } = useDebounceFn(async () => {
    const data = await editor?.current?.save()
    onContent && onContent(toJSON<OutputBlockData[]>(data?.blocks || []))
    console.log('editor data23', data?.blocks)
  })

  useEffect(() => {
    if (!editor.current) {
      editor.current = new EditorJS({
        data: { blocks: toObject(defaultContent) },
        holder: editorRef.current as HTMLDivElement,
        readOnly,
        tools: {
          header: Header,
          list: List,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
            config: {
              headers: {
                'X-ARTICLE-ID': articleId,
              },
              endpoint: `http://localhost:3000/api/hyperLink`, // Your backend endpoint for url data fetching,
            },
          },
          inlineCode: InlineCode,
          code: CodeTool,
          table: Table,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `http://localhost:3000/api/image?type=CONTENT&id=${articleId}`, // Your backend file uploader endpoint
              },
            },
          },
        },
        placeholder: '请输入...',
        onReady: () => {
          console.log('Editor.js is ready to work!')
        },
        onChange: () => {
          onEditHandle()
        },
      })
    }
    return () => {
      if (editor.current && editor.current.destroy) {
        editor.current.destroy()
      }
    }
  }, [])

  return (
    <>
      <EditorCover
        readOnly={readOnly}
        titleValue={title}
        coverValue={coverUrl}
        onTitleChange={onTitle}
        onCoverChange={onCover}
      ></EditorCover>
      <div
        tabIndex={0}
        ref={editorRef}
        className="dark-mode prose prose-sm mx-auto dark:prose-invert sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl focus:outline-none"
      ></div>
    </>
  )
}
export default Editor
