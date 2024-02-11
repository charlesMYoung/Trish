'use client'

import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { FaImages } from 'react-icons/fa'

export type TitleInputToolProps = {
  isShow?: boolean
  onButtonPress?: () => void
}

export const TitleInputTool = ({
  isShow,
  onButtonPress,
}: TitleInputToolProps) => {
  return (
    <motion.div className="h-12">
      {isShow ? (
        <motion.div
          className="flex space-x-2"
          animate={{
            opacity: [0, 1],
          }}
        >
          <Button isIconOnly onPress={onButtonPress}>
            <FaImages />
          </Button>
        </motion.div>
      ) : (
        []
      )}
    </motion.div>
  )
}
