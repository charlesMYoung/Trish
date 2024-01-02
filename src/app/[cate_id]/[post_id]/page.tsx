import { Editor } from '@/components'
import { trpc } from '@/utils/trpc-rsc'

const getArticle = (id: string, cateId: string) => {
  return trpc.getArticleByCateIdAndId({
    id,
    cateId,
  })
}

export default async function Post({
  params,
}: {
  params: { cate_id: string; post_id: string }
}) {
  const { cate_id, post_id } = params || []
  const currentArticle = await getArticle(post_id, cate_id)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Editor
        readOnly
        articleId={post_id}
        coverUrl={
          currentArticle?.images.find((img) => img.type === 'COVER')?.url || ''
        }
        title={currentArticle?.title || ''}
        defaultContent={currentArticle?.content || ''}
      ></Editor>
    </div>
  )
}
