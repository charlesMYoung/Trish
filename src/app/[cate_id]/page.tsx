'use client'

import { ClientTRPC } from '@/trpc/client'
import { Card, Skeleton } from '@nextui-org/react'
import { useEffect } from 'react'

export default function Cate({ cate_id }: { cate_id: string }) {
  const {
    mutate: getArticleByCateId,
    isLoading,
    data,
  } = ClientTRPC.getArticleByCateId.useMutation()

  useEffect(() => {
    getArticleByCateId({
      id: cate_id,
    })
  }, [])

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4 p-24 md:grid-cols-4">
      {Array(10)
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
        })}
    </div>
  )
}
