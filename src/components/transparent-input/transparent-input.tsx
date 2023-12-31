'use client'

import { Input } from '@nextui-org/react'

export type NoStyleInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  defaultValue?: string
}

export function NoStyleInput({ onChange, defaultValue }: NoStyleInputProps) {
  return (
    <Input
      onChange={(e) => {
        onChange && onChange(e)
      }}
      defaultValue={defaultValue}
      tabIndex={0}
      placeholder="无标题"
      classNames={{
        input: ['bg-transparent', 'hover:bg-transparent', 'text-md', 'z-10'],
        innerWrapper: ['bg-transparent', 'hover:bg-transparent'],
        inputWrapper: [
          'bg-transparent z-10',
          'border-none',
          'hover:bg-transparent',
          'data-[hover=true]:bg-transparent',
          'group-data-[focus=true]:bg-transparent',
        ],
      }}
    />
  )
}
