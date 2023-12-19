'use client'

import Checklist from '@editorjs/checklist'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import { useEffect, useRef } from 'react'

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = new EditorJS({
      holder: editorRef.current as HTMLElement,
      tools: {
        header: Header,
        list: List,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
      },
      logLevel: 'VERBOSE',
      autofocus: true,
      placeholder: 'Let`s write an awesome story!',
      onReady: () => {
        console.log('Editor.js is ready to work!')
      },
      onChange: () => {
        console.log("Now I know that Editor's content changed!")
      },
    })
    console.log('editor->', editor)
  }, [])

  return <div ref={editorRef}></div>
}
