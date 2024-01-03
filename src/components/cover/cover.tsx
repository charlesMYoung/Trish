'use client'

import {
  Button,
  ButtonGroup,
  Card,
  Image,
  useDisclosure,
} from '@nextui-org/react'
import { useControllableValue, useHover } from 'ahooks'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { FaTrash } from 'react-icons/fa'
import { TbArrowsExchange } from 'react-icons/tb'
import { CoverCloseParam, CoverModal } from './modal-cover'

export type CoverProps = {
  value?: string
  onChange?: (value: string) => void
}
export const Cover = ({ value, onChange }: CoverProps) => {
  const coverModalRef = useRef(null)
  const isCoverModalHovering = useHover(coverModalRef)
  const [coverUrl, setCoverUrl] = useControllableValue<string>({
    onChange,
    value,
  })
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const onRemoveCoverHandle = () => {
    setCoverUrl('')
  }

  const onCloseChangeHandle = ({ coverUrl }: CoverCloseParam) => {
    if (coverUrl) {
      setCoverUrl(coverUrl)
      onClose()
    }
  }

  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
    >
      <CoverModal
        isOpen={isOpen}
        onCloseChange={onCloseChangeHandle}
        onOpenChange={onOpenChange}
      />
      {coverUrl && (
        <Card
          className="relative h-60 sm:h-80 md:h-80 lg:h-80"
          ref={coverModalRef}
        >
          <Image
            src={coverUrl}
            removeWrapper
            className="z-0 h-full w-full object-cover"
            alt="cover_image"
          />
          {isCoverModalHovering ? (
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
      )}
    </motion.div>
  )
}
