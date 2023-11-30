import { Card, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { ClassNameValue, twMerge } from 'tailwind-merge'

export type InfoCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgImg: string;
  valueClass?: ClassNameValue
};

export const InfoCard = ({ icon, title, value, bgImg, valueClass }: InfoCardProps) => {
  return <Card>
    <CardHeader className="absolute z-10 top-1 flex-col !items-start h-full">
      <div className="text-2xl text-zinc-50 uppercase font-bold flex leading-1 items-center">
        {icon} <span className="ml-2">{title}</span>
      </div>
      <div className={twMerge('text-blue-300', "font-medium text-6xl flex-1 w-full flex items-end justify-end", valueClass)}>
        {value}
      </div>
    </CardHeader>
    <div className="w-80 aspect-video">
      <Image
        fill
        src={bgImg}
        alt={title}
        className="dark:brightness-75 z-0 w-full h-full object-cover"
      ></Image>
    </div>
  </Card>
};
