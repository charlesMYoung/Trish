'use client'

import { Input } from '@nextui-org/react'
import { useControllableValue } from 'ahooks'

export type NoStyleInputProps = {
  onChange?: (value: string) => void
  value?: string
  defaultValue?: string
}

export function NoStyleInput({
  onChange,
  value,
  defaultValue,
}: NoStyleInputProps) {
  const [inputTitleState, setInputTitleState] = useControllableValue<string>({
    onChange,
    value,
  })

  return (
    <Input
      onChange={(e) => {
        setInputTitleState(e.target.value)
      }}
      value={inputTitleState}
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
