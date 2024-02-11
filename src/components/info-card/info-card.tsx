import { Card, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { type ClassNameValue, twMerge } from 'tailwind-merge'

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
    <Card className="w-full flex-initial">
      <CardHeader className="absolute top-1 z-10 h-full flex-col !items-start">
        <div className="leading-1 flex items-center text-5xl font-bold uppercase text-zinc-50  md:text-3xl">
          {icon} <span className="ml-2">{title}</span>
        </div>
        <div
          className={twMerge(
            'text-blue-300',
            'flex w-full flex-1 items-end justify-end text-9xl font-medium md:text-5xl',
            valueClass
          )}
        >
          {value}
        </div>
      </CardHeader>
      <div className="aspect-video">
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
