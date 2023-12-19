'use client'

import { Cover } from '@/components'
import { useOnChange, useSlashMenu, useToggle } from '@/hooks'
import { Button, Input } from '@nextui-org/react'
import { Editor, Range } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/react'
import { KeyboardEvent, useEffect, useRef } from 'react'
import { FaImages } from 'react-icons/fa6'
import Commons from './slash-menu/command'
import { SlashMenu } from './slash-menu/slash-menu'
import { TipTapExtends } from './tiptap-extensions'

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
  const editorRef = useRef<Editor | null>(null)
  const slashMenuRef = useRef<Range | null>(null)

  const editor = useEditor({
    extensions: [
      ...TipTapExtends,
      Commons.configure({
        suggestion: {
          render: () => {
            return {
              onStart,
              onUpdate,
              onKeyDown,
              onExit,
            }
          },
        },
      }),
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
  editorRef.current = editor

  const [
    { slashMenuRec, selectedIndex, slashMenus, isOpen },
    { onExit, onKeyDown, onStart, onUpdate },
  ] = useSlashMenu({
    onKeyDownCallback: (item, range) => {
      if (item.command) {
        item.command({
          editor: editorRef.current as Editor,
          range,
        })
      }
    },
    onRange: (range) => {
      slashMenuRef.current = range
    },
  })

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

  useEffect(
    () => () => {
      editor?.destroy()
    },
    []
  )

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
      <SlashMenu
        slashMenuCommands={slashMenus}
        isOpen={isOpen}
        rect={slashMenuRec}
        selectedIndex={selectedIndex}
        editor={editor}
        range={slashMenuRef.current}
      />
    </>
  )
}
