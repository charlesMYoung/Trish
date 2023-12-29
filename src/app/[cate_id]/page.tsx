'use client'

import { CardSkeleton } from '@/components'
import { ClientTRPC } from '@/trpc/client'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import NextLink from 'next/link'
import { useEffect } from 'react'

export default function Cate({
  params: { cate_id },
}: {
  params: { cate_id: string }
}) {
  const {
    mutate: getArticleByCateId,
    isLoading,
    data,
  } = ClientTRPC.getArticleByCateId.useMutation()

  console.log('data--->', data, 'cate_id')

  useEffect(() => {
    getArticleByCateId({
      id: cate_id,
    })
  }, [])

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4 p-24 md:grid-cols-4">
      {isLoading ? (
        <CardSkeleton count={10}></CardSkeleton>
      ) : (
        data?.map((item) => {
          return (
            <Card
              key={item.id}
              isPressable
              as={NextLink}
              href={`/${cate_id}/${item.id}`}
            >
              <CardHeader className="text-3xl text-primary-500">
                {item.title}
              </CardHeader>
              <CardBody>
                {item.images.find((img) => img.type === 'COVER') ? (
                  <Image
                    src={
                      item.images.find((img) => img.type === 'COVER')?.url || ''
                    }
                    alt={item.title || ''}
                    removeWrapper
                    width={'100%'}
                    className="h-full w-full"
                  ></Image>
                ) : null}
              </CardBody>
            </Card>
          )
        })
      )}
    </div>
  )
}
