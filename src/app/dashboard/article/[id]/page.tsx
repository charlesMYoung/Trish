'use client'
import { OnUpdateParam, TipTapEditor } from '@/components'
import { ClientTRPC } from '@/trpc/client'
import { isCuid } from '@paralleldrive/cuid2'
import { useParams } from 'next/navigation'

export default function Write() {
  const aritleMuation = ClientTRPC.upsetAritcle.useMutation()
  const { id } = useParams<{ id: string }>()

  const onUpdateDebounce = (value: OnUpdateParam) => {
    console.log('value', value)
    if (id && isCuid(id)) {
      aritleMuation.mutate({
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
