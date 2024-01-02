import Editor from '@/components/editor/editor'
import { trpc } from '@/utils/trpc-rsc'
import { Metadata, ResolvingMetadata } from 'next'

const getArticle = (id: string, cateId: string) => {
  return trpc.getArticleByCateIdAndId({
    id,
    cateId,
  })
}

type Props = {
  params: { cate_id: string; post_id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const product = await getArticle(params.post_id, params.cate_id)

  return {
    title: product?.title,
  }
}

export default async function Post({ params }: Props) {
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
