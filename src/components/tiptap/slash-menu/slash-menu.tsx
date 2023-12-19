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
      className={twMerge(
        'absolute',
        // 'w-44',
        'z-0 bg-transparent outline-none',
        "before:absolute before:z-[-1] before:hidden before:h-2.5 before:w-2.5 before:rotate-45 before:rounded-sm before:bg-content1 before:shadow-small before:content-['']",
        'data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[placement=bottom-end]:before:-top-[calc(theme(spacing.5)/4_-_1.5px)] data-[placement=bottom-end]:before:right-3 data-[placement=bottom-start]:before:-top-[calc(theme(spacing.5)/4_-_1.5px)] data-[placement=bottom-start]:before:left-3 data-[placement=bottom]:before:-top-[calc(theme(spacing.5)/4_-_1.5px)] data-[placement=bottom]:before:left-1/2 data-[placement=left-end]:before:-right-[calc(theme(spacing.5)/4_-_3px)] data-[placement=left-end]:before:bottom-1/4 data-[placement=left-start]:before:-right-[calc(theme(spacing.5)/4_-_3px)] data-[placement=left-start]:before:top-1/4 data-[placement=left]:before:-right-[calc(theme(spacing.5)/4_-_2px)] data-[placement=left]:before:top-1/2 data-[placement=right-end]:before:-left-[calc(theme(spacing.5)/4_-_3px)] data-[placement=right-end]:before:bottom-1/4 data-[placement=right-start]:before:-left-[calc(theme(spacing.5)/4_-_3px)] data-[placement=right-start]:before:top-1/4 data-[placement=right]:before:-left-[calc(theme(spacing.5)/4_-_2px)] data-[placement=right]:before:top-1/2 data-[placement=top-end]:before:-bottom-[calc(theme(spacing.5)/4_-_1.5px)] data-[placement=top-end]:before:right-3 data-[placement=top-start]:before:-bottom-[calc(theme(spacing.5)/4_-_1.5px)] data-[placement=top-start]:before:left-3 data-[placement=top]:before:-bottom-[calc(theme(spacing.5)/4_-_1.5px)] data-[placement=top]:before:left-1/2 data-[arrow=true]:before:block data-[placement=bottom]:before:-translate-x-1/2 data-[placement=left]:before:-translate-y-1/2 data-[placement=right]:before:-translate-y-1/2 data-[placement=top]:before:-translate-x-1/2'
      )}
    >
      <div
        className="z-10 box-border
       inline-flex w-full flex-col items-center
       justify-center rounded-large bg-content1 px-2.5
       py-1 text-small subpixel-antialiased
        shadow-medium outline-none"
      >
        <div className="w-full px-1 py-2">
          <div className=" mb-2 rounded-md text-small font-bold">基础格式</div>
          <div className="flex flex-col space-y-2">
            {Array.isArray(slashMenuCommands)
              ? slashMenuCommands.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        if (item && item.command && range) {
                          item.command({ editor, range })
                        }
                      }}
                      key={item.title}
                      className={twMerge(
                        selectedIndex === index && 'bg-primary-100',
                        'flex items-center space-y-2 rounded-lg pr-2'
                      )}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-large bg-default-100 text-center text-3xl text-default-500">
                        {item.icon}
                      </div>
                      <div className="ml-2">
                        <div className="text-large">{item.title}</div>
                        <div className="text-small text-default-400">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  )
                })
              : []}
          </div>
        </div>
      </div>
    </div>
  ) : null
}
