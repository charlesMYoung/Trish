import { Editor, Range } from '@tiptap/core'
import {
  PiTable,
  PiTextB,
  PiTextHOne,
  PiTextHThree,
  PiTextHTwo,
} from 'react-icons/pi'

export type SlashCommand = (params: { editor: Editor; range: Range }) => void

export type SlashMenuCommand = {
  icon?: React.ReactNode
  title?: string
  description?: string
  command?: SlashCommand
}

export const SlashMenusConfig: SlashMenuCommand[] = [
  {
    icon: <PiTextHOne></PiTextHOne>,
    title: 'H1',
    description: 'this is h1 text',
    command: ({ editor, range }) => {
      console.log('editor', editor, 'range', range)
      if (editor) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run()
      }
    },
  },
  {
    icon: <PiTextHTwo></PiTextHTwo>,
    title: 'H2',
    description: 'this is h2 text',
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 3 })
        .run()
    },
  },
  {
    icon: <PiTextHThree></PiTextHThree>,
    title: 'H3',
    description: 'this is h2 text',
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 4 })
        .run()
    },
  },
  {
    icon: <PiTextB></PiTextB>,
    title: 'bold',
    description: 'this is text 3',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark('bold').run()
    },
  },
  {
    icon: <PiTable></PiTable>,
    title: 'table',
    description: 'this is text 3',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark('italic').run()
    },
  },
]
