'use client'

import { Button } from '@nextui-org/react'

import { createId } from '@paralleldrive/cuid2'
import { useRouter } from 'next/navigation'

export default function Article() {
  const route = useRouter()
  const buttonClick = () => {
    const cuid = createId()
    console.log('cuid', cuid)
    route.push(`/dashboard/article/${cuid}`)
  }

  return <Button onPress={buttonClick}>article</Button>
}
