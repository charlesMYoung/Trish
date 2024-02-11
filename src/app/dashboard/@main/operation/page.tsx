'use client'
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { api } from '~/trpc/react'

export default function Operation() {
  const {
    data,
    mutate: getLogByPagination,
    isLoading,
  } = api.log.getLogByPagination.useMutation()

  const session = useSession()
  console.log('session', session)

  useEffect(() => {
    getLogByPagination({
      current: 1,
      size: 50,
    })
  }, [])

  const onPaginationChange = (page: number) => {
    getLogByPagination({
      current: page,
      size: 50,
    })
  }

  const pageCount = useMemo(() => {
    return data?.total ? Math.ceil(data.total / data.size) : 0
  }, [data?.total])

  const loadingState = isLoading || data?.data.length === 0 ? 'loading' : 'idle'

  return (
    <Table
      color="danger"
      selectionMode="multiple"
      aria-label="operation logs"
      bottomContent={
        <div className="flex w-full justify-center">
          {data ? (
            <Pagination
              loop
              showControls
              showShadow
              siblings={data.size}
              initialPage={1}
              total={pageCount}
              color="secondary"
              page={data.current}
              onChange={onPaginationChange}
            />
          ) : null}
        </div>
      }
    >
      <TableHeader>
        <TableColumn>时间</TableColumn>
        <TableColumn>级别</TableColumn>
        <TableColumn>信息</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.data ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => {
          return (
            <TableRow key={item.id}>
              <TableCell>
                {dayjs(item.created_at).format('YYYY/MM/DD HH:mm:ss')}
              </TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>{item.message}</TableCell>
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}
