'use client'

import { useDebounce } from '@/hooks/useDebounce'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export type TipTapEditorProps = {
  defaultContent?: string
  onUpdateDebounce?: (content: string) => void
}

export const TipTapEditor = ({
  defaultContent,
  onUpdateDebounce,
}: TipTapEditorProps) => {
  const { start } = useDebounce<string>((content) => {
    console.log('content', content)
    onUpdateDebounce && onUpdateDebounce(content)
  }, 200)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
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
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
    content: defaultContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      start(content)
    },
  })

  return <EditorContent editor={editor} />
}
