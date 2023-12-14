'use client'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'

type SidebarItemProps = {
  children: React.ReactNode
  href: string
  icon?: React.ReactNode
  isActive?: boolean
  isShowDelBtn?: boolean
  onSidebarDel?: () => void
}

export function SidebarItem({
  children,
  href,
  icon,
  isActive,
  isShowDelBtn,
  onSidebarDel,
}: SidebarItemProps) {
  return (
    <div className="flex items-center rounded-xl pl-3.5 transition-all duration-150 hover:bg-primary-100 active:scale-[0.98]">
      <Link
        href={href}
        className="flex w-full max-w-full justify-between text-default-900 active:bg-none"
      >
        <div
          className={clsx(
            isActive ? 'bg-primary-100 [&_svg_path]:fill-primary-500' : '',
            `flex h-full min-h-[44px] w-full cursor-pointer items-center gap-2`
          )}
        >
          {icon}
          <span className="text-default-900">{children}</span>
        </div>
      </Link>
      {isShowDelBtn ? (
        <Button
          isIconOnly
          className="text-danger"
          variant="flat"
          onPress={() => {
            onSidebarDel && onSidebarDel()
          }}
        >
          <IoMdCloseCircleOutline></IoMdCloseCircleOutline>
        </Button>
      ) : null}
    </div>
  )
}
