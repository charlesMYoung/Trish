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
import { useEffect, useRef } from 'react'

export type UseEditorProps = {
  defaultContent: string
  readOnly?: boolean
  id: string
  onChange: (content: string) => void
}

export const useEditor = ({
  defaultContent,
  readOnly,
  id,
  onChange,
}: UseEditorProps) => {
  const editor = useRef<EditorJS | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)

  const onChangeHandle = async () => {
    if (editor && editor.current) {
      if (editor?.current.save) {
        const data = await editor?.current.save()
        onChange && onChange(toJSON<OutputBlockData[]>(data?.blocks || []))
      }
    }
  }

  useEffect(() => {
    if (!editor.current) {
      editor.current = new EditorJS({
        data: { blocks: toObject(defaultContent, []) },
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
                'X-ARTICLE-ID': id,
              },
              endpoint: `/api/hyperLink`, // Your backend endpoint for url data fetching,
            },
          },
          inlineCode: InlineCode,
          code: CodeTool,
          table: Table,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `/api/image?type=CONTENT&id=${id}`, // Your backend file uploader endpoint
              },
            },
          },
        },
        placeholder: readOnly ? '暂无内容...' : '请输入...',
        onReady: () => {
          console.log('Editor.js is ready to work!')
        },
        onChange: () => onChangeHandle(),
      })
    }
    return () => {
      if (editor.current && editor.current.destroy) {
        editor.current.destroy()
      }
    }
  }, [])
  return { editorRef, editor }
}
