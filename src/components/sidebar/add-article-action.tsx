'use client'

import { Button } from '@nextui-org/react'
import { createId } from '@paralleldrive/cuid2'
import { FaPlus } from 'react-icons/fa6'

type AddArticleProps = {
  onAddArticle: (articleId: string, categoryId: string) => void
  categoryId: string
}

export const AddArticle = ({ onAddArticle, categoryId }: AddArticleProps) => {
  const onPressHandle = () => {
    const cuid = createId()
    return onAddArticle(cuid, categoryId)
  }

  return (
    <Button onPress={onPressHandle} size="sm" variant="flat" isIconOnly>
      <FaPlus className="text-default-500"></FaPlus>
    </Button>
  )
}
