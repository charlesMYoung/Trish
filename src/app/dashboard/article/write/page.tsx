'use client'

import { Editor } from '@tiptap/core'
import { Editor as EditorView } from 'novel'

export default function Write() {
  const onUpdate = (edit?: Editor) => {
    console.log(edit)
  }

  // Renders the editor instance using a React component.
  return <EditorView className="bg-background" onUpdate={onUpdate} />
}
