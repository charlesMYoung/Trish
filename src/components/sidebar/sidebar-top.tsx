'use client'
import { Avatar } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

export function SidebarTop() {
  return (
    <div
      className={twMerge(
        'z-40 flex h-auto w-full items-center justify-center',
        'my-2 mb-10 h-20'
      )}
    >
      <Avatar
        showFallback
        name="Jane"
        src="https://images.unsplash.com/broken"
      />
    </div>
  )
}
