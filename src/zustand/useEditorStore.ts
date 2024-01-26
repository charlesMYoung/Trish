import { StateCreator, create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createSelectors } from './createSelectors'

export interface EditorStoreProps {
  title: string
  cover: string
  initEditor: (p: { title: string; cover?: string }) => void
  changeEditorTitle: (p: string) => void
  changeEditorCover: (p: string) => void
}

const editorStore: StateCreator<
  EditorStoreProps,
  [
    ['zustand/immer', never],
    ['zustand/devtools', unknown],
    ['zustand/subscribeWithSelector', unknown],
  ]
> = (set) => ({
  title: '',
  cover: '',
  initEditor: ({ title, cover }) =>
    set((state) => {
      state.title = title
      state.cover = cover || ''
    }),
  changeEditorTitle: (title: string) =>
    set((state) => {
      state.title = title
    }),
  changeEditorCover: (cover: string) =>
    set((state) => {
      state.cover = cover
    }),
})

/**
 * Zustand store for sidebar
 */
export const useEditorStore = createSelectors(
  create<EditorStoreProps>()(
    immer(
      devtools(subscribeWithSelector(editorStore), {
        enabled: process.env.NODE_ENV === 'development',
        name: 'sidebar-store',
      })
    )
  )
)
