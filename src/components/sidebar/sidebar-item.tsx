import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'

type SidebarItemProps = {
  children: React.ReactNode
  href: string
  icon?: React.ReactNode
  isActive?: boolean
}

export function SidebarItem({
  children,
  href,
  icon,
  isActive,
}: SidebarItemProps) {
  return (
    <Link href={href} className="max-w-full text-default-900 active:bg-none">
      <div
        className={clsx(
          isActive
            ? 'bg-primary-100 [&_svg_path]:fill-primary-500'
            : 'hover:bg-primary-100',
          'flex h-full min-h-[44px] w-full cursor-pointer items-center gap-2 rounded-xl px-3.5 transition-all duration-150 active:scale-[0.98]'
        )}
      >
        {icon}
        <span className="text-default-900">{children}</span>
      </div>
    </Link>
  )
}
