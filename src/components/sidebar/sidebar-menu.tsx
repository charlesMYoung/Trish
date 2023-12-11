'use client'
import { Button } from '@nextui-org/react'
import { ReactNode } from 'react'
import { FaPlus } from 'react-icons/fa6'
export function SidebarMenu({
  children,
  onAdd,
  id,
}: {
  children: ReactNode
  id: string
  onAdd: () => void
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      {children}
      {id === 'category' && (
        <Button isIconOnly size="sm" variant="flat" onPress={onAdd}>
          <FaPlus></FaPlus>
        </Button>
      )}
    </div>
  )
}
