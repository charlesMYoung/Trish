'use client'

import { GalleryList } from '@/config/appConfig'
import { Card } from '@nextui-org/react'
import Image from 'next/image'

type Gallery = {
  name: string
  url: string
}

type BackgroundProps = {
  onChosen?: (param: Gallery) => void
}

export const BackgroundPanel = ({ onChosen }: BackgroundProps) => {
  const onChosenHandle = (gallery: Gallery) => {
    console.log('gallery', gallery)
    if (onChosen) onChosen(gallery)
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {GalleryList.map((item) => {
        return (
          <Card
            className="m-2 aspect-video w-40 cursor-pointer"
            key={item.name}
          >
            <Image
              onClick={() => {
                onChosenHandle({
                  name: item.name,
                  url: item.url,
                })
              }}
              src={item.url}
              alt={item.name}
              fill
              className="z-0 h-full w-full object-cover dark:brightness-75"
            />
          </Card>
        )
      })}
    </div>
  )
}
