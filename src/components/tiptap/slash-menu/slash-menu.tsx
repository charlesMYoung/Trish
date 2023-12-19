'use client'

import { SlashMenuCommand } from '@/config'
import { Editor, Range } from '@tiptap/core'
import { twMerge } from 'tailwind-merge'

export type SlashMenuProps = {
  isOpen?: boolean
  rect?: DOMRect
  selectedIndex?: number
  slashMenuCommands?: SlashMenuCommand[]
  editor: Editor
  range?: Range | null
}

export const SlashMenu = ({
  isOpen,
  rect,
  selectedIndex,
  slashMenuCommands,
  editor,
  range,
}: SlashMenuProps) => {
  return isOpen ? (
    <div
      style={{
        top: `${rect ? rect.top : 0}px`,
        left: `${rect ? rect.left : 0}px`,
      }}
      className={twMerge('absolute', 'z-50')}
    >
      <div className="px-1 py-2">
        {Array.isArray(slashMenuCommands)
          ? slashMenuCommands.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    console.log('command item>>>> befre')
                    if (item && item.command && range) {
                      item.command({ editor, range })
                      console.log('command item>>>>', editor, range)
                    }
                  }}
                  key={item.title}
                  className={twMerge(
                    selectedIndex === index && 'bg-primary-100'
                  )}
                >
                  {item.title}
                </div>
              )
            })
          : []}
      </div>
    </div>
  ) : null
}
