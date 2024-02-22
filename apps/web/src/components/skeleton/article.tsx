'use client'

import { Skeleton } from '@nextui-org/react'

type CardSkeleton = {
  count: number
}

export const ListSkeleton = ({ count = 10 }: CardSkeleton) => {
  return Array(count)
    .fill(0)
    .map((_, index) => {
      return (
        <div className="space-y-5 p-4" key={index}>
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
        </div>
      )
    })
}
