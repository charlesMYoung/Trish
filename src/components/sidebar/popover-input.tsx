'use client'

import { useOnChange } from '@/hooks'
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'

export type onPopoverInputChangeParam = {
  id: string
  value: string
}

export type PopoverInputProps = {
  activeId: string
  name: string
  id: string
  onClose: () => void
  onPopoverInputChange: (name: string, id: string) => void
}

export const PopoverInput = ({
  activeId,
  name,
  id,
  onClose,
  onPopoverInputChange,
}: PopoverInputProps) => {
  const inputHook = useOnChange<string>({
    onChangeFn: (value) => {
      onPopoverInputChange(value, id)
    },
  })

  return (
    <Popover isOpen={id === activeId} onClose={onClose} placement="bottom">
      <PopoverTrigger>{name}</PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <Input
            value={inputHook.value}
            size="sm"
            onChange={(event) => {
              inputHook.onChange(event.target.value)
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
