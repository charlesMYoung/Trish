'use client'

import { Button } from '@nextui-org/react'
import { useHover } from 'ahooks'
import { ReactNode, useRef, useState } from 'react'
import { useCollapse } from 'react-collapsed'

type CollapseProps = {
  title: string | ReactNode
  items?: ReactNode
  onCollapseChange?: (key: string) => void
  id: string
  startContent?: ReactNode
  onHover?: (id: string) => void
}

export const Collapse = ({
  title,
  items,
  onCollapseChange,
  startContent,
  id,
  onHover,
}: CollapseProps) => {
  const [isExpanded, setExpanded] = useState(false)
  const collapseRef = useRef<HTMLDivElement>(null)
  useHover(collapseRef, {
    onEnter: () => {
      onHover && onHover(id)
    },
    onLeave: () => {
      onHover && onHover('')
    },
  })
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  return (
    <div className="relative w-full" ref={collapseRef}>
      <Button
        className="!hover:bg-primary-100 flex h-11 w-full
              items-center justify-between rounded-lg border-none bg-transparent px-3 py-0 text-lg data-[hover=true]:bg-primary-100"
        startContent={startContent}
        {...getToggleProps({
          onClick: () => {
            setExpanded((prevExpanded) => {
              if (!prevExpanded) {
                onCollapseChange && onCollapseChange(id)
              }
              return !prevExpanded
            })
          },
        })}
      >
        {title}
        <span
          data-open={isExpanded ? 'true' : 'false'}
          aria-hidden="true"
          className="rotate-0 px-2 text-medium 
                  text-default-400 transition-transform
                data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-90"
        >
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
          >
            <path
              d="M15.5 19l-7-7 7-7"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            ></path>
          </svg>
        </span>
      </Button>
      <section {...getCollapseProps()}>{items}</section>
    </div>
  )
}

Collapse.displayName = 'Collapse'
