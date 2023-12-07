'use client'
import { OnUpdateParam, TipTapEditor } from '@/components'
import { ClientTRPC } from '@/trpc/client'
import { isCuid } from '@paralleldrive/cuid2'
import { useParams } from 'next/navigation'

export default function Write() {
  const articleMutation = ClientTRPC.upsetArticle.useMutation()
  const { id } = useParams<{ id: string }>()

  const onUpdateDebounce = (value: OnUpdateParam) => {
    console.log('value', value)
    if (id && isCuid(id)) {
      articleMutation.mutate({
        ...value,
        id,
      })
    }
  }

  return (
    <TipTapEditor
      onUpdateDebounce={onUpdateDebounce}
      defaultContent=""
    ></TipTapEditor>
  )
}
