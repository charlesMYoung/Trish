'use client'

import { Card, Skeleton } from '@nextui-org/react'

type CardSkeleton = {
  count: number
}

export const CardSkeleton = ({ count }: CardSkeleton) => {
  return Array(10)
    .fill(0)
    .map((_, index) => {
      return (
        <Card className="space-y-5 p-4" radius="lg" key={index}>
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      )
    })
}
