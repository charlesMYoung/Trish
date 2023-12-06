'use client'

import { Cover } from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import { Button, Input } from '@nextui-org/react'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { KeyboardEvent, useState } from 'react'
import { FaImages } from 'react-icons/fa6'

export type TipTapEditorProps = {
  defaultContent?: string
  onUpdateDebounce?: (content: string) => void
}

export const TipTapEditor = ({
  defaultContent = '',
  onUpdateDebounce,
}: TipTapEditorProps) => {
  const { start } = useDebounce<string>((content) => {
    console.log('content', content)
    onUpdateDebounce && onUpdateDebounce(content)
  }, 200)

  const [coverUrl, setCoverUrl] = useState<string>('')

  const [isShowLongPress, setShowlongpress] = useState<boolean>(false)
  const [isShowCover, setShowCover] = useState<boolean>(false)

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
      start(content)
    },
  })

  const onKeyUpHandle = ({ key }: KeyboardEvent) => {
    if (key === 'Enter' && editor && !editor.isFocused) {
      editor.commands.focus('start')
    }
  }

  const showCoverHandel = () => {
    setShowCover(true)
  }

  const ToolButtonGroup = () => {
    return (
      <div className="flex space-x-2">
        <Button isIconOnly onPress={showCoverHandel}>
          <FaImages />
        </Button>
      </div>
    )
  }

  const onMouseOverHandle = () => {
    console.log('onMouseOverHandle>>>>>>>')
    setShowlongpress(true)
  }

  const onMouseLeaveHandle = () => {
    console.log('onMouseLeaveHandle>>>>>>>')
    setShowlongpress(false)
  }

  const onRemoveCover = () => {
    setShowCover(false)
  }
  return (
    <>
      {isShowCover ? (
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
        onMouseOver={onMouseOverHandle}
        onMouseLeave={onMouseLeaveHandle}
      >
        <div className={'h-12'}>
          {isShowLongPress && !isShowCover ? <ToolButtonGroup /> : null}
        </div>
        <Input
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
