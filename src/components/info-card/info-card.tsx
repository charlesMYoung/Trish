import { Card, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'

export type InfoCardProps = {
  title: string
  value: string | number
  icon: React.ReactNode
  bgImg: string
  valueClass?: ClassNameValue
}

export const InfoCard = ({
  icon,
  title,
  value,
  bgImg,
  valueClass,
}: InfoCardProps) => {
  return (
    <Card>
      <CardHeader className="absolute top-1 z-10 h-full flex-col !items-start">
        <div className="leading-1 flex items-center text-2xl font-bold uppercase text-zinc-50">
          {icon} <span className="ml-2">{title}</span>
        </div>
        <div
          className={twMerge(
            'text-blue-300',
            'flex w-full flex-1 items-end justify-end text-6xl font-medium',
            valueClass
          )}
        >
          {value}
        </div>
      </CardHeader>
      <div className="aspect-video w-72">
        <Image
          fill
          src={bgImg}
          alt={title}
          className="z-0 h-full w-full object-cover dark:brightness-75"
        ></Image>
      </div>
    </Card>
  )
}
