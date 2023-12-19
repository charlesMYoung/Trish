import { SlashMenuCommand, SlashMenusConfig } from '@/config'
import { Range } from '@tiptap/core'
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion'
import { useToggle } from 'ahooks'
import { useState } from 'react'

export const useSlashMenu = ({
  onKeyDownCallback,
  onRange,
}: {
  onKeyDownCallback: (p: SlashMenuCommand, r: Range) => void
  onRange: (p: Range) => void
}) => {
  const [slashMenuRec, setSlashMenuRec] = useState<DOMRect>({} as DOMRect)
  const [selectedIndex, setSelectIndex] = useState<number>(0)
  const [isToggle, { setLeft, setRight }] = useToggle(false)

  const onStart = ({ clientRect, range }: SuggestionProps) => {
    if (clientRect) {
      const currentClientRect = clientRect()
      if (currentClientRect) {
        setSlashMenuRec(currentClientRect)
        setRight()
        onRange(range)
        return
      }
    }
  }

  const onExit = () => {
    setLeft()
  }

  const onUpdate = ({ clientRect, range }: SuggestionProps) => {
    if (!clientRect) {
      return
    }
    onRange(range)
    setLeft()
  }

  const onKeyDown = ({ event, range }: SuggestionKeyDownProps) => {
    if (event.key === 'ArrowUp') {
      upHandler()
      onRange(range)
      return true
    }

    if (event.key === 'ArrowDown') {
      downHandler()
      return true
    }

    if (event.key === 'Enter') {
      enterHandler(range)
    }

    return false
  }

  const enterHandler = (range: Range) => {
    const item = SlashMenusConfig[selectedIndex]
    if (item && item.command) {
      onKeyDownCallback && onKeyDownCallback(item, range)
    }
  }

  const upHandler = () => {
    setSelectIndex((preIndex) => {
      return (preIndex + SlashMenusConfig.length - 1) % SlashMenusConfig.length
    })
  }

  const downHandler = () => {
    setSelectIndex((preIndex) => {
      return (preIndex + 1) % SlashMenusConfig.length
    })
  }

  return [
    {
      slashMenus: SlashMenusConfig,
      slashMenuRec,
      isOpen: isToggle,
      selectedIndex,
    },
    {
      onStart,
      onExit,
      onUpdate,
      onKeyDown,
    },
  ]
}
