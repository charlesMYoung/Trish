'use client'
import { Button } from '@nextui-org/react'
import { ReactNode } from 'react'
import { FaPlus } from 'react-icons/fa6'
export function SidebarMenu({
  children,
  onMenus,
}: {
  children: ReactNode
  onMenus: (cateName: string) => void
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      {children}
      {children === '文章' && (
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => {
            onMenus(children as string)
          }}
        >
          <FaPlus></FaPlus>
        </Button>
      )}
    </div>
  )
}
