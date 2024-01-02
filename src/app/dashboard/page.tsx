'use client'

import { InfoCard } from '@/components'
import { trpc } from '@/utils/trpc-client'
import { useSession } from 'next-auth/react'
import { FaFileAlt, FaTag } from 'react-icons/fa'
import { FaCommentDots, FaImage } from 'react-icons/fa6'

export default function Dashboard() {
  const { data: articleCounts } = trpc.countArticle.useQuery()
  const { data: session, status } = useSession()
  console.log('session', session, status)
  return (
    <div className="mb-4">
      <div className="mb-4 text-large text-default-500">快速预览</div>
      <div className="flex space-x-4">
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
