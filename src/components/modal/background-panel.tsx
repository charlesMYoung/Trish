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
    if (onChosen) onChosen(gallery)
  }
  return (
    <>
      {GalleryList.map((item) => {
        return (
          <Card
            key={item.name}
            onClick={() => {
              onChosenHandle({
                name: item.name,
                url: item.url,
              })
            }}
          >
            <Image src={item.url} alt={item.name} fill />
          </Card>
        )
      })}
    </>
  )
}
