'use client'

import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'

export type PopoverInputProps = {
  activeId: string
  name: string
  id: string
  onClose: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PopoverInput = ({
  activeId,
  name,
  id,
  onClose,
  onChange,
}: PopoverInputProps) => {
  return (
    <Popover isOpen={id === activeId} onClose={onClose} placement="bottom">
      <PopoverTrigger>{name}</PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <Input size="sm" onChange={onChange} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
