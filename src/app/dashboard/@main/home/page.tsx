'use client'

import Editor from '~/components/editor/editor'
import { useEditorStore } from '~/zustand'
import { Button, Skeleton } from '@nextui-org/react'
import { useDebounceFn } from 'ahooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { MdViewCozy } from 'react-icons/md'
import { shallow } from 'zustand/shallow'
import { api } from '~/trpc/react'

export default function HomeAdmin() {
  const { mutate: updateArticleTitle } =
    api.article.upsertHomeArticleTitle.useMutation()
  const route = useRouter()
  const title = useEditorStore.use.title()
  const changeTitle = useEditorStore.use.changeEditorTitle()
  const initEditor = useEditorStore.use.initEditor()
  const {
    data: homeArticle,
    isLoading,
    mutate,
  } = api.article.getHomeArticle.useMutation({
    onSuccess(data) {
      initEditor({
        title: data?.title || '',
      })
    },
  })

  const { mutate: updateArticleContent } =
    api.article.updateHomeArticleContent.useMutation()

  const { run: updateArticleTitleByTitleDebounce } =
    useDebounceFn(updateArticleTitle)

  const { run: updateArticleContentDebounce } =
    useDebounceFn(updateArticleContent)

  const onContentHandle = (content: string) => {
    updateArticleContentDebounce({
      content,
    })
  }

  useEffect(() => {
    mutate()
    const titleStoreSub = useEditorStore.subscribe(
      (state) => state.title,
      (curSidebars, preSidebars) => {
        if (curSidebars !== preSidebars) {
          updateArticleTitleByTitleDebounce({
            title: curSidebars,
          })
        }
      },
      {
        equalityFn: shallow,
      }
    )
    return () => {
      titleStoreSub()
    }
  }, [])

  const onArticleViewHandle = () => {
    route.push(`/`)
  }

  return isLoading ? (
    <div className="flex flex-col space-y-2">
      <Skeleton className="flex h-64 w-full rounded-lg" />
      <Skeleton className="flex h-20 w-72 rounded-lg" />
      <Skeleton className=" flex h-screen w-full rounded-lg" />
    </div>
  ) : (
    <>
      <Editor
        articleId={'home'}
        onTitle={changeTitle}
        onContent={onContentHandle}
        title={title || ''}
        defaultContent={homeArticle?.content || ''}
      ></Editor>
      <Button
        variant="shadow"
        color="primary"
        isIconOnly
        radius="full"
        className="fixed bottom-16 right-16"
        size="lg"
        onPress={onArticleViewHandle}
      >
        <MdViewCozy></MdViewCozy>
      </Button>
    </>
  )
}
