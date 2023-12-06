'use client'
import { Button, Card, Image, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { TbArrowsExchange } from 'react-icons/tb'
import { CoverCloseParam, CoverModal } from './modal-cover'

export type CoverProps = {
  coverUrl: string
  onRemoveCover?: () => void
  onCoverChange?: (coverUrl: string) => void
}
export const Cover = ({
  coverUrl,
  onRemoveCover,
  onCoverChange,
}: CoverProps) => {
  const [isShowTool, setShowTool] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onMouseOverHandle = () => {
    setShowTool(true)
  }
  const onMouseLeaveHandle = () => {
    setShowTool(false)
  }

  const onRemoveCoverHandle = () => {
    if (onRemoveCover) onRemoveCover()
  }

  const onCloseChangeHandle = ({ key, data }: CoverCloseParam) => {
    console.log('data', data)
    if (!onCoverChange) return
    if (key === 'photos' && data) {
      onCoverChange(data.url as string)
    }

    onClose()
  }

  return (
    <>
      <CoverModal isOpen={isOpen} onCloseChange={onCloseChangeHandle} />
      <Card
        className="relative h-60 sm:h-80 md:h-80 lg:h-80 "
        onMouseOver={onMouseOverHandle}
        onMouseLeave={onMouseLeaveHandle}
      >
        <Image
          src={coverUrl}
          removeWrapper
          className="z-0 h-full w-full object-cover"
          alt="cover_image"
        />
        {isShowTool ? (
          <div className="absolute right-3 top-3 z-20 flex space-x-2">
            <Button isIconOnly variant="ghost" onPress={onOpen}>
              <TbArrowsExchange />
            </Button>
            <Button isIconOnly variant="ghost" onPress={onRemoveCoverHandle}>
              <FaTrash />
            </Button>
          </div>
        ) : (
          []
        )}
        <div
          className="absolute right-0 top-0 z-10 box-border flex h-full
             w-full flex-col items-center justify-center p-14 md:items-start"
        ></div>
      </Card>
    </>
  )
}
