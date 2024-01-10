'use client'

import { Button } from '@nextui-org/react'
import { useHover } from 'ahooks'
import { ReactNode, useRef, useState } from 'react'
import { useCollapse } from 'react-collapsed'
import { IoIosArrowForward } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

type CollapseProps = {
  title: string | ReactNode
  items?: ReactNode
  onCollapseChange?: (key: string) => void
  id: string
  startContent?: ReactNode
  isActived?: boolean
  onHover?: (id: string) => void
}

export const Collapse = ({
  title,
  items,
  onCollapseChange,
  startContent,
  id,
  onHover,
  isActived,
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
        className={twMerge(
          `!hover:bg-primary-100 flex h-11 w-full items-center
          justify-between rounded-lg border-none bg-transparent px-3 py-0 pr-0 text-lg data-[hover=true]:bg-primary-100`,
          isActived && `bg-primary-50 data-[hover=true]:bg-primary-100`
        )}
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
        <span
          data-open={isExpanded ? 'true' : 'false'}
          aria-hidden="true"
          className="rotate-0 text-medium text-default-400 transition-transform
                data-[open=true]:rotate-90 rtl:-rotate-180 rtl:data-[open=true]:rotate-90"
        >
          <IoIosArrowForward />
        </span>
        {title}
      </Button>
      {Array.isArray(items) && items.length > 0 ? (
        <section
          {...getCollapseProps()}
          className="my-4 flex flex-col space-y-1"
        >
          {items}
        </section>
      ) : (
        []
      )}
    </div>
  )
}

Collapse.displayName = 'Collapse'
