import Editor from '@/components/editor/editor'
import { trpc } from '@/utils/trpc-rsc'
import { Metadata } from 'next'

const getArticle = (id: string) => {
  return trpc.getArticleById({
    id,
  })
}

type Props = {
  params: { post_id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const product = await getArticle(params.post_id)

  return {
    title: product?.title,
  }
}

export default async function Post({ params }: Props) {
  const { post_id } = params || []
  const currentArticle = await getArticle(post_id)

  return (
    <div className="flex min-h-screen flex-col px-6">
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
