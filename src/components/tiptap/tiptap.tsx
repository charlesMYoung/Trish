'use client'

import { Cover } from '@/components'
import { useToggle } from '@/hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { Button, Input } from '@nextui-org/react'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ChangeEventHandler, KeyboardEvent, useEffect, useState } from 'react'
import { FaImages } from 'react-icons/fa6'

export type OnUpdateParam = {
  content?: string
  title: string
  coverUrl: string
}

export type TipTapEditorProps = {
  defaultContent?: string
  onUpdateDebounce?: (param: OnUpdateParam) => void
}

export const TipTapEditor = ({
  defaultContent = '',
  onUpdateDebounce,
}: TipTapEditorProps) => {
  const [coverUrl, setCoverUrl] = useState<string>('')
  const [articleContent, setArticleContent] = useState<string>('')
  const inputButtonToggle = useToggle(false)
  const coverButtonToggle = useToggle(false)
  const [title, setTitle] = useState<string>('')
  const { start } = useDebounce<OnUpdateParam>(
    ({ title, coverUrl, content }) => {
      onTipTapEditorUpdate({
        title,
        coverUrl,
        content,
      })
    },
    200
  )

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4, 5, 6],
        },
      }),
      Document,
      Paragraph,
      Blockquote,
      Bold,
    ],
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    editable: true,
    injectCSS: false,
    content: defaultContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      setArticleContent(content)
    },
  })

  /**
   * 监听三个状态变化
   */
  useEffect(
    () =>
      start({
        content: articleContent,
        title,
        coverUrl,
      }),
    [title, coverUrl, articleContent]
  )

  const onKeyUpHandle = ({ key }: KeyboardEvent) => {
    if (key === 'Enter' && editor && !editor.isFocused) {
      editor.commands.focus('start')
    }
  }

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value || ''
    setTitle(value)
  }

  const onTipTapEditorUpdate = (param: OnUpdateParam) =>
    onUpdateDebounce && onUpdateDebounce(param)

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
    setCoverUrl('')
  }
  return (
    <>
      {coverButtonToggle.isToggle ? (
        <Cover
          onRemoveCover={onRemoveCover}
          onCoverChange={setCoverUrl}
          coverUrl={coverUrl}
        />
      ) : (
        []
      )}

      <div
        className="prose prose-sm mx-auto dark:prose-invert sm:prose lg:prose-lg xl:prose-2xl"
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
          value={title}
          onChange={onChangeTitle}
          tabIndex={1}
          placeholder="无标题"
          classNames={{
            input: [
              'bg-transparent',
              'hover:bg-transparent',
              'text-7xl',
              'h-45',
            ],
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
      <EditorContent editor={editor} tabIndex={2} />
    </>
  )
}
