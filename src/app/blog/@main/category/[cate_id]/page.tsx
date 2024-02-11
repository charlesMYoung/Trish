'use client'

import { ListSkeleton } from '~/components'
import { groupByArray } from '~/utils/common'
import { Link } from '@nextui-org/react'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { api } from '~/trpc/react'
import { type Category } from '~/server/db/schema'

export default function Cate({
  params: { cate_id },
}: {
  params: { cate_id: string }
}) {
  const {
    mutate: getArticleByCateId,
    isLoading,
    data,
  } = api.article.getArticleByCateId.useMutation()

  const { data: categoriesFromServer } = api.category.getAllCategory.useQuery<
    Category[]
  >(void 0, {
    refetchOnWindowFocus: false,
  })
  const pathname = useParams<{ cate_id: string }>()

  useEffect(() => {
    getArticleByCateId({
      id: cate_id,
    })
  }, [])

  const groupYear = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      const result = data.map((item) => {
        return {
          ...item,
          year: dayjs(item.release_date).year(),
        }
      })
      return groupByArray(result, 'year')
    }
    return []
  }, [data])

  return (
    <div className="prose mx-auto px-6 lg:prose-lg xl:prose-xl dark:prose-invert md:px-0">
      <div className="flex w-full flex-col space-y-4 py-10 md:flex-row md:space-x-6 md:space-y-0">
        {categoriesFromServer?.map((cate) => {
          return (
            <Link
              key={cate.id}
              as={NextLink}
              className="text-2xl"
              href={`/blog/category/${cate.id}`}
              color={cate.id !== pathname.cate_id ? 'foreground' : undefined}
            >
              {cate.name}
            </Link>
          )
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 space-y-28 py-20">
        {isLoading ? (
          <ListSkeleton count={10}></ListSkeleton>
        ) : groupYear.length > 0 ? (
          groupYear.map(({ key, value }) => {
            return (
              <div key={key} className="relative flex">
                <div className="text-stroke-2 absolute -left-6 -top-16 select-none text-9xl font-bold !text-transparent opacity-10">
                  {key}
                </div>
                <div className="flex w-full flex-col space-y-8">
                  {value.map((link) => {
                    return (
                      <Link
                        className="text-2xl text-default-500"
                        as={NextLink}
                        href={`/blog/post/${link.id}`}
                        size="lg"
                        key={link.id}
                      >
                        {link.title}
                        <span className="ml-2 text-xl text-default-200">
                          {dayjs(link.release_date).format('MM-DD')}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-2xl">没有数据</div>
        )}
      </div>
    </div>
  )
}
