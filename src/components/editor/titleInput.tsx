'use client'

import { Input } from '@nextui-org/react'
import { useControllableValue, useHover } from 'ahooks'
import { useRef } from 'react'
import { TitleInputTool } from './title-input-tool'

export type TitleInputProps = {
  onChange?: (value: string) => void
  value?: string
  defaultValue?: string
  readOnly?: boolean
  coverUrl?: string
  onAddCoverPress?: () => void
}

export function TitleInput({
  onChange,
  value,
  coverUrl,
  defaultValue,
  readOnly,
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
      className="container prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert"
      ref={inputTitleRef}
    >
      <TitleInputTool
        isShow={isInputHovering && !readOnly && !coverUrl}
        onButtonPress={onAddCoverPress}
      ></TitleInputTool>
      <Input
        onChange={(e) => {
          setInputTitleState(e.target.value)
        }}
        value={inputTitleState}
        defaultValue={defaultValue}
        tabIndex={0}
        isReadOnly={readOnly}
        placeholder="无标题"
        classNames={{
          input: [
            'bg-transparent',
            'hover:bg-transparent',
            'z-10',
            'text-2xl',
            'lg:text-6xl',
          ],
          innerWrapper: ['bg-transparent', 'hover:bg-transparent'],
          inputWrapper: [
            'px-0 ',
            'bg-transparent z-10',
            'border-none',
            'hover:bg-transparent',
            'shadow-none',
            'data-[hover=true]:bg-transparent',
            'group-data-[focus=true]:bg-transparent',
          ],
        }}
      />
    </div>
  )
}
