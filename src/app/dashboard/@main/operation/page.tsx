'use client'
import { trpc } from '@/utils/trpc-client'
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
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Operation() {
  const {
    data,
    mutate: getLogByPagination,
    isLoading,
  } = trpc.getLogByPagination.useMutation()

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
              showControls
              showShadow
              initialPage={1}
              total={data.total}
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
              <TableCell>{item.created_at}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>{item.message}</TableCell>
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}
