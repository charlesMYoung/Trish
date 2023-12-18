'use client'

import { Editor, Range } from '@tiptap/core'
import { twMerge } from 'tailwind-merge'

export type Commands = {
  title: string
  command: (params: { editor: Editor; range: Range }) => void
}

export type SlashMenuProps = {
  isOpen?: boolean
  rect: DOMRect
  commands: Commands[]
  selectedIndex: number
}

export const SlashMenu = ({
  isOpen,
  rect,
  commands,
  selectedIndex,
}: SlashMenuProps) => {
  return isOpen ? (
    <div
      style={{
        top: `${rect.top}px`,
        left: `${rect.left}px`,
      }}
      className={twMerge('absolute')}
    >
      <div className="px-1 py-2">
        {Array.isArray(commands)
          ? commands.map((item, index) => {
              return (
                <div
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
