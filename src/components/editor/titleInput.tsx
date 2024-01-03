'use client'

import { Input } from '@nextui-org/react'
import { useControllableValue, useHover } from 'ahooks'
import { useRef } from 'react'
import { TitleInputTool } from './title-input-tool'

export type TitleInputProps = {
  onChange?: (value: string) => void
  value?: string
  defaultValue?: string
  readonly?: boolean
  coverUrl?: string
  onAddCoverPress?: () => void
}

export function TitleInput({
  onChange,
  value,
  coverUrl,
  defaultValue,
  readonly,
  onAddCoverPress,
}: TitleInputProps) {
  const [inputTitleState, setInputTitleState] = useControllableValue<string>({
    onChange,
    value,
  })
  const inputTitleRef = useRef(null)
  const isInputHovering = useHover(inputTitleRef)

  return (
    <div
      className="prose prose-sm mx-auto dark:prose-invert sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl"
      ref={inputTitleRef}
    >
      <TitleInputTool
        isShow={isInputHovering && !readonly && !coverUrl}
        onButtonPress={onAddCoverPress}
      ></TitleInputTool>
      <Input
        onChange={(e) => {
          setInputTitleState(e.target.value)
        }}
        value={inputTitleState}
        defaultValue={defaultValue}
        tabIndex={0}
        isReadOnly={readonly}
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
    </div>
  )
}
