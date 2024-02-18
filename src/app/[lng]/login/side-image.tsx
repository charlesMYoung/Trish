'use client'

import Image from 'next/image'
import { useDark } from '~/hooks/useDark'

export const SideLoginImage = () => {
  const { isDark } = useDark()

  return (
    <Image
      src={
        isDark
          ? '/images/bg/01_login_blue_bg.jpg'
          : '/images/bg/01_login_blue_light_bg.jpg'
      }
      alt={'login bg image'}
      fill
      className="z-0 h-full w-full object-cover rounded rounded-r-lg"
    />
  )
}
