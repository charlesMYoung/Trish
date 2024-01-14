'use client'

import { trpc } from '@/utils/trpc-client'
import { Card, CardFooter, Link } from '@nextui-org/react'
import Image from 'next/image'
import { useMemo } from 'react'

type Gallery = {
  name: string
  url: string
}

type BackgroundProps = {
  onChosen?: (param: Gallery) => void
}

export const BackgroundPanel = ({ onChosen }: BackgroundProps) => {
  const { data: unsplashData } = trpc.getCoverList.useQuery()
  const onChosenHandle = (gallery: Gallery) => {
    if (onChosen) onChosen(gallery)
  }
  const showUnsplash = useMemo(() => {
    if (Array.isArray(unsplashData)) {
      return unsplashData.map((item) => {
        return {
          user: item.user.username,
          thumb: item.urls.thumb,
          url: item.urls.regular,
          origin: item.links.html,
        }
      })
    }
    return []
  }, [unsplashData])
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {showUnsplash &&
        showUnsplash.map((item) => {
          return (
            <Card
              className="m-2 aspect-video w-40 cursor-pointer"
              key={item.user}
              isFooterBlurred
            >
              <Image
                onClick={() => {
                  onChosenHandle({
                    name: item.user,
                    url: item.url,
                  })
                }}
                src={item.thumb}
                alt={item.thumb}
                fill
                className="z-0 h-full w-full object-cover"
              />
              <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
                <div>
                  <Link
                    className="text-tiny text-black"
                    href={item.origin}
                    size="sm"
                  >
                    {item.user}
                  </Link>
                </div>
              </CardFooter>
            </Card>
          )
        })}
    </div>
  )
}
