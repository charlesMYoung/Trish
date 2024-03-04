'use client'

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { api } from '~/trpc/react'

export default function DashboardDefault() {
  const { data: articleCounts } = api.article.countArticle.useQuery()
  const { data: session, status } = useSession()
  console.log('session', session, status)
  return (
    <div className="mb-4">
      <div className="mb-4 flex h-10 items-center">
        <Breadcrumbs>
          <BreadcrumbItem>主菜单</BreadcrumbItem>
          <BreadcrumbItem>仪表盘</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex w-full flex-col space-y-6 md:flex-row md:space-x-4 md:space-y-0"></div>
    </div>
  )
}
