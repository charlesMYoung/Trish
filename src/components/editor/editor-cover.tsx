'use client'

import { Cover, NoStyleInput } from '@/components'
import { Button } from '@nextui-org/react'
import { useHover, useToggle } from 'ahooks'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { FaImages } from 'react-icons/fa6'

export type EditorCoverProps = {
  titleValue?: string
  readOnly?: boolean
  coverValue?: string
  onTitleChange?: (title: string) => void
  onCoverChange?: (coverUrl: string) => void
}

export const EditorCover = ({
  titleValue,
  coverValue,
  readOnly = false,
  onTitleChange,
  onCoverChange,
}: EditorCoverProps) => {
  const inputTitleRef = useRef(null)
  const isInputHovering = useHover(inputTitleRef)

  const [
    coverButtonToggle,
    { setLeft: coverButtonToggleClose, setRight: coverButtonToggleOpen },
  ] = useToggle(false)

  const ToolButtonGroup = () => {
    return (
      <div className="flex space-x-2">
        <Button isIconOnly onPress={coverButtonToggleOpen}>
          <FaImages />
        </Button>
      </div>
    )
  }

  const onCoverChangeHandle = (coverUrl: string) => {
    onCoverChange && onCoverChange(coverUrl)
    if (!coverUrl) {
      coverButtonToggleClose()
    }
  }

  return (
    <>
      {coverButtonToggle ? (
        <Cover onChange={onCoverChangeHandle} value={coverValue} />
      ) : (
        []
      )}
      <div
        className="prose prose-sm mx-auto dark:prose-invert sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl"
        ref={inputTitleRef}
      >
        <div className={'h-12'}>
          {!readOnly && isInputHovering && !coverButtonToggle ? (
            <motion.div
              animate={{
                opacity: [0, 1],
              }}
            >
              <ToolButtonGroup />
            </motion.div>
          ) : null}
        </div>
        <NoStyleInput
          value={titleValue}
          onChange={onTitleChange}
        ></NoStyleInput>
      </div>
    </>
  )
}
