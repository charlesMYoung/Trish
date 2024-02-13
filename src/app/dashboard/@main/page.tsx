'use client'

import { InfoCard } from '@/components'
import { trpc } from '@/utils/trpc-client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { FaFileAlt, FaTag } from 'react-icons/fa'
import { FaCommentDots, FaImage } from 'react-icons/fa6'

export default function DashboardDefault() {
  const { data: articleCounts } = trpc.countArticle.useQuery()
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
      <div className="flex w-full flex-col space-y-6 md:flex-row md:space-x-4 md:space-y-0">
        <InfoCard
          title="文章"
          icon={<FaFileAlt />}
          value={articleCounts as number}
          bgImg="/images/postbg.jpg"
        ></InfoCard>
        <InfoCard
          title="图片"
          icon={<FaImage />}
          value={75}
          bgImg="/images/poster.jpg"
          valueClass="!text-red-500"
        ></InfoCard>
        <InfoCard
          title="标签分类"
          icon={<FaTag />}
          value={75}
          bgImg="/images/tag.jpg"
          valueClass="!text-pink-500"
        ></InfoCard>
        <InfoCard
          title="留言"
          icon={<FaCommentDots />}
          value={75}
          bgImg="/images/chat.jpg"
          valueClass="!text-zinc-100"
        ></InfoCard>
      </div>
    </div>
  )
}
