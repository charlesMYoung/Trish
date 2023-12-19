import { Editor, Range } from '@tiptap/core'

export type SlashCommand = (params: { editor: Editor; range: Range }) => void

export type SlashMenuCommand = {
  icon?: React.ReactNode
  title?: string
  description?: string
  command?: SlashCommand
}

export const SlashMenusConfig: SlashMenuCommand[] = [
  {
    icon: 'icon',
    title: 'H1',
    description: 'this is h1 text',
    command: ({ editor, range }) => {
      console.log('editor', editor, 'range', range)
      if (editor) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run()
      }
    },
  },
  {
    title: 'H2',
    description: 'this is h2 text',
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 2 })
        .run()
    },
  },
  {
    title: 'bold',
    description: 'this is text 3',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark('bold').run()
    },
  },
  {
    title: 'italic',
    description: 'this is text 3',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark('italic').run()
    },
  },
]
