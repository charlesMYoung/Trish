'use client'

import { Cover } from '@/components'
import { Button, Input } from '@nextui-org/react'
import { useControllableValue, useToggle } from 'ahooks'
import { FaImages } from 'react-icons/fa6'

export type EditorCoverProps = {
  titleValue?: string
  coverValue?: string
  onTitleChange?: (title: string) => void
  onCoverChange?: (coverUrl: string) => void
}

export const EditorCover = ({
  titleValue,
  coverValue,
  onTitleChange,
  onCoverChange,
}: EditorCoverProps) => {
  const [
    inputButtonToggle,
    { setLeft: inputButtonToggleClose, setRight: inputButtonToggleOpen },
  ] = useToggle(false)
  const [
    coverButtonToggle,
    { setLeft: coverButtonToggleClose, setRight: coverButtonToggleOpen },
  ] = useToggle(false)

  const [coverState, setCoverState] = useControllableValue<string>({
    value: coverValue,
    onChange: onCoverChange,
  })
  const [inputTitleState, setInputTitleState] = useControllableValue<string>({
    value: titleValue,
    onChange: onTitleChange,
  })

  const ToolButtonGroup = () => {
    return (
      <div className="flex space-x-2">
        <Button isIconOnly onPress={coverButtonToggleOpen}>
          <FaImages />
        </Button>
      </div>
    )
  }

  const onRemoveCover = () => {
    coverButtonToggleClose()
    setCoverState('')
  }

  return (
    <>
      {coverButtonToggle ? (
        <Cover
          onRemoveCover={onRemoveCover}
          onCoverChange={setCoverState}
          coverUrl={coverState}
        />
      ) : (
        []
      )}
      <div
        className="prose prose-sm mx-auto dark:prose-invert sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl"
        onMouseOver={inputButtonToggleOpen}
        onMouseLeave={inputButtonToggleClose}
      >
        <div className={'h-12'}>
          {inputButtonToggle && !coverButtonToggle ? <ToolButtonGroup /> : null}
        </div>
        <Input
          value={inputTitleState}
          onChange={(event) => setInputTitleState(event.target.value)}
          tabIndex={-1}
          placeholder="无标题"
          classNames={{
            input: ['bg-transparent', 'hover:bg-transparent', 'text-6xl'],
            innerWrapper: ['bg-transparent', 'hover:bg-transparent'],
            inputWrapper: [
              'h-45',
              'bg-transparent',
              'border-none',
              'hover:bg-transparent',
              'data-[hover=true]:bg-transparent',
              'group-data-[focus=true]:bg-transparent',
            ],
          }}
        />
      </div>
    </>
  )
}
