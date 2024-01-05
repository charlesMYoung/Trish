'use client'
import Link from 'next/link'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

type SidebarItemProps = {
  children: React.ReactNode
  href: string
  icon?: React.ReactNode
  isActive?: boolean
  isShowDelBtn?: boolean
}

export function SidebarItem({
  children,
  href,
  icon,
  isActive,
}: SidebarItemProps) {
  return (
    <div
      className={twMerge(
        'flex items-center rounded-xl pl-3.5 transition-all duration-150 hover:bg-primary-100 active:scale-[0.98]',
        isActive ? 'bg-primary-200 ' : ''
      )}
    >
      <Link
        href={href}
        className="flex w-full max-w-full justify-between text-default-900 active:bg-none"
      >
        <div className="flex h-full min-h-[44px] w-full cursor-pointer items-center gap-2">
          {icon}
          <span className="text-default-900">{children}</span>
        </div>
      </Link>
    </div>
  )
}
