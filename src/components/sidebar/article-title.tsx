'use client'
import { Button } from '@nextui-org/react'
import { useHover } from 'ahooks'
import Link from 'next/link'
import { type ReactNode, useRef } from 'react'
import { FaTrashCan } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

type ArticleTitleProps = {
  children: ReactNode
  href: string
  icon?: ReactNode
  isActive?: boolean
  isShowDelBtn?: boolean
  onSidebarDel?: () => void
}

export function ArticleTitle({
  children,
  href,
  isActive,
  onSidebarDel,
}: ArticleTitleProps) {
  const articleTitleRef = useRef<HTMLDivElement>(null)
  const isHovering = useHover(articleTitleRef)
  return (
    <div
      ref={articleTitleRef}
      className={twMerge(
        'flex h-9 items-center rounded-xl pl-3.5 indent-4 text-sm transition-all duration-150 hover:bg-primary-100 active:scale-[0.98]',
        isActive ? 'bg-primary-200' : ''
      )}
    >
      <Link
        href={href}
        className="flex w-full max-w-full justify-between text-default-900 active:bg-none"
      >
        <div
          className="flex h-full w-full max-w-[100px] cursor-pointer items-center gap-2 truncate text-default-900"
          title={children as string}
        >
          {children}
        </div>
      </Link>
      {isHovering ? (
        <Button
          isIconOnly
          className="rounded-full bg-transparent !text-danger"
          onPress={() => {
            onSidebarDel && onSidebarDel()
          }}
        >
          <FaTrashCan></FaTrashCan>
        </Button>
      ) : (
        []
      )}
    </div>
  )
}
