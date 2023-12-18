'use client'
import { Cover } from '@/components'
import { useOnChange, useToggle } from '@/hooks'
import { Button, Input } from '@nextui-org/react'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { KeyboardEvent } from 'react'
import { FaImages } from 'react-icons/fa6'

export type TipTapEditorProps = {
  defaultContent?: string
  defaultTitle?: string
  onTitle: (title: string) => void
  onCover: (coverUrl: string) => void
  onContent: (content: string) => void
}

export const TipTapEditor = ({
  defaultContent = '',
  defaultTitle = '',
  onTitle,
  onCover,
  onContent,
}: TipTapEditorProps) => {
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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4, 5, 6],
        },
      }),
      Document,
      Paragraph,
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Blockquote,
      Bold,
      Text,
      TableRow,
      TableHeader,
      TableCell,
      Table,
      TaskItem,
      TaskList,
    ],
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    editable: true,
    injectCSS: false,
    content: defaultContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      onContent(content)
    },
  })

  const onKeyUpHandle = ({ key }: KeyboardEvent) => {
    if (key === 'Enter' && editor && !editor.isFocused) {
      editor.commands.focus('start')
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

  if (!editor) {
    return null
  }
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
      <EditorContent editor={editor} tabIndex={2} />
    </>
  )
}
