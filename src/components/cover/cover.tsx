'use client'

import { useToggle } from '@/hooks'
import {
  Button,
  ButtonGroup,
  Card,
  Image,
  useDisclosure,
} from '@nextui-org/react'
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
  const toolToggle = useToggle(false)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const onRemoveCoverHandle = () => {
    if (onRemoveCover) onRemoveCover()
  }

  const onCloseChangeHandle = ({ coverUrl }: CoverCloseParam) => {
    if (!onCoverChange || !coverUrl) return
    onCoverChange(coverUrl)
    onClose()
  }

  return (
    <>
      <CoverModal
        isOpen={isOpen}
        onCloseChange={onCloseChangeHandle}
        onOpenChange={onOpenChange}
      />
      <Card
        className="relative h-60 sm:h-80 md:h-80 lg:h-80 "
        onMouseOver={toolToggle.open}
        onMouseLeave={toolToggle.close}
      >
        <Image
          src={coverUrl}
          removeWrapper
          className="z-0 h-full w-full object-cover"
          alt="cover_image"
        />
        {toolToggle.isToggle ? (
          <div className="absolute right-3 top-3 z-20 flex space-x-2">
            <ButtonGroup>
              <Button
                isIconOnly
                variant="ghost"
                onPress={onOpen}
                color="primary"
              >
                <TbArrowsExchange />
              </Button>
              <Button
                isIconOnly
                variant="ghost"
                color="primary"
                onPress={onRemoveCoverHandle}
              >
                <FaTrash />
              </Button>
            </ButtonGroup>
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
