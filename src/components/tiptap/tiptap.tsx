'use client'
import { Cover } from '@/components'
import { useOnChange, useToggle } from '@/hooks'
import { Button, Input } from '@nextui-org/react'
import { EditorContent, useEditor } from '@tiptap/react'
import { KeyboardEvent, useEffect, useState } from 'react'
import { FaImages } from 'react-icons/fa6'
import Commons from './slash-menu/command'
import { Commands, SlashMenu } from './slash-menu/slash-menu'
import suggestion from './slash-menu/suggestion'
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
  const slashToggle = useToggle(false)
  const [slashMenuRec, setSlashMenuRec] = useState<DOMRect>(null)
  const [slashCommands, setSlashCommands] = useState<Commands>()
  const [selectedIndex, setSelectIndex] = useState<number>(0)

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

  const onStart = (startProps) => {
    const currentClientRect = startProps.clientRect()
    console.log('showSlashMenu', currentClientRect)
    setSlashMenuRec(currentClientRect)
    setSlashCommands(startProps.items)
    slashToggle.open()
  }

  const onExit = () => {
    slashToggle.close()
  }

  const onUpdate = () => {}

  const onKeyDown = ({ event, view, range }) => {
    if (event.key === 'ArrowUp') {
      upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      downHandler()
      return true
    }

    if (event.key === 'Enter') {
      // enterHandler()
      const items = slashCommands[selectedIndex]
      if (items) {
        items.command({
          editor: view,
          range,
        })
      }
    }

    return false
  }

  const upHandler = () => {
    setSelectIndex((preIndex) => {
      return (preIndex + 4 - 1) % 4
    })
  }

  const downHandler = () => {
    setSelectIndex((preIndex) => {
      return (preIndex + 1) % 4
    })
  }

  const editor = useEditor({
    extensions: [
      ...TipTapExtends,
      Commons.configure({
        suggestion: suggestion({
          onStart,
          onExit,
          onKeyDown,
          onUpdate,
        }),
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
        isOpen={slashToggle.isToggle}
        rect={slashMenuRec}
        commands={slashCommands}
        selectedIndex={selectedIndex}
      ></SlashMenu>
    </>
  )
}
