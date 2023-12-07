'use client'
import { OnUpdateParam, TipTapEditor } from '@/components'

export default function Write() {
  const onUpdateDebounce = (value: OnUpdateParam) => {
    console.log('value', value)
  }

  return (
    <TipTapEditor
      onUpdateDebounce={onUpdateDebounce}
      defaultContent=""
    ></TipTapEditor>
  )
}
