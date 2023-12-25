'use client'

import { Cover } from '@/components'
import { useOnChange, useToggle } from '@/hooks'
import Checklist from '@editorjs/checklist'
import CodeTool from '@editorjs/code'
import EditorJS, { OutputBlockData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Image from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import { Button, Input } from '@nextui-org/react'
import { useDebounceFn } from 'ahooks'
import { KeyboardEvent, useEffect, useRef } from 'react'
import { FaImages } from 'react-icons/fa6'

export type TipTapEditorProps = {
  defaultContent?: string
  defaultTitle?: string
  articleId: string
  onTitle: (title: string) => void
  onCover: (coverUrl: string) => void
  onContent: (content: string) => void
}

export const Editor = ({
  defaultContent = '',
  defaultTitle = '',
  articleId,
  onTitle,
  onCover,
  onContent,
}: TipTapEditorProps) => {
  const editor = useRef<EditorJS | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const inputButtonToggle = useToggle(false)
  const coverButtonToggle = useToggle(false)

  const articleTitleHook = useOnChange<string>({
    onChangeFn(e) {
      console.log('articleTitleHook', e)
      onTitle(e)
    },
  })

  const coverChangeHook = useOnChange<string>({
    onChangeFn(e) {
      onCover(e)
      console.log('coverChangeHook', e)
    },
  })

  const onKeyUpHandle = ({ key }: KeyboardEvent) => {
    if (key === 'Enter' && editor) {
      editor.current?.focus()
    }
  }

  const ToolButtonGroup = () => {
    return (
      <div className="flex space-x-2">
        <Button isIconOnly onPress={coverButtonToggle.open}>
          <FaImages />
        </Button>
      </div>
    )
  }

  const onRemoveCover = () => {
    coverButtonToggle.close()
    coverChangeHook.onChange('')
  }

  const toJSON = (object: OutputBlockData[]) => {
    return JSON.stringify(object)
  }

  const { run: onEditHandle } = useDebounceFn(async () => {
    const data = await editor?.current?.save()
    onContent(toJSON(data?.blocks || []))
    console.log('editor data23', data?.blocks)
  })

  console.log('articleId>>>>', articleId)

  const jsonContent: (j: string) => OutputBlockData[] = (jsonStr) => {
    try {
      return JSON.parse(jsonStr)
    } catch (e) {
      console.trace('[jsonContent] error', jsonContent)
      return [] as OutputBlockData[]
    }
  }

  useEffect(() => {
    if (!editor.current) {
      editor.current = new EditorJS({
        data: { blocks: jsonContent(defaultContent) },
        holder: editorRef.current as HTMLDivElement,
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
      {coverButtonToggle.isToggle ? (
        <Cover
          onRemoveCover={onRemoveCover}
          onCoverChange={coverChangeHook.onChange}
          coverUrl={coverChangeHook.value}
        />
      ) : (
        []
      )}
      <div
        className="prose prose-sm mx-auto dark:prose-invert sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl"
        onKeyUp={onKeyUpHandle}
        onMouseOver={inputButtonToggle.open}
        onMouseLeave={inputButtonToggle.close}
      >
        <div className={'h-12'}>
          {inputButtonToggle.isToggle && !coverButtonToggle.isToggle ? (
            <ToolButtonGroup />
          ) : null}
        </div>
        <Input
          value={articleTitleHook.value}
          defaultValue={defaultTitle}
          onChange={(event) => articleTitleHook.onChange(event.target.value)}
          tabIndex={1}
          placeholder="无标题"
          classNames={{
            input: ['bg-transparent', 'hover:bg-transparent', 'text-6xl'],
            innerWrapper: ['bg-transparent', 'hover:bg-transparent'],
            inputWrapper: [
              'h-45',
              'bg-transparent',
              'border-none',
              'hover:bg-transparent',
              'data-[hover=true]:bg-transparent',
              'group-data-[focus=true]:bg-transparent',
            ],
          }}
        />
      </div>
      <div
        tabIndex={2}
        ref={editorRef}
        className="dark-mode prose prose-sm mx-auto dark:prose-invert sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl focus:outline-none"
      ></div>
    </>
  )
}
