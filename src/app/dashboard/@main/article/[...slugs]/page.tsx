'use client'

import { Button, Skeleton } from '@nextui-org/react'
import { useDebounceFn } from 'ahooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { MdViewCozy } from 'react-icons/md'
import { shallow } from 'zustand/shallow'
import { Toolbar } from '~/components'
import Editor from '~/components/editor/editor'
import { useSidebarStore } from '~/hooks'
import { api } from '~/trpc/react'
import { useEditorStore } from '~/zustand'

export default function ArticlePage({
  params,
}: {
  params: { slugs: string[] }
}) {
  const [cateId, articleId] = params.slugs || []
  const route = useRouter()

  const title = useEditorStore.use.title()
  const cover = useEditorStore.use.cover()
  const changeTitle = useEditorStore.use.changeEditorTitle()
  const changeEditorCover = useEditorStore.use.changeEditorCover()
  const updateArticleTitleById = useSidebarStore.use.updateArticleTitleById()
  const initEditor = useEditorStore.use.initEditor()
  const { mutate: updateArticleCover } =
    api.article.updateArticleCover.useMutation({})

  const { mutate: updateArticleCoverRelease } =
    api.article.updateArticleRelease.useMutation()

  const {
    data: currentArticle,
    mutate: getArticleByCateIdAndId,
    isLoading,
  } = api.article.getArticleByCateIdAndId.useMutation({
    onSuccess(data) {
      initEditor({
        title: data?.title ?? '',
        cover: data?.images.find((item) => item.type === 'COVER')?.url ?? '',
      })
    },
  })

  const { mutate: updateTitleByTitleMutate } =
    api.article.updateArticleTitleByTitle.useMutation()

  const { mutate: updateArticleContent } =
    api.article.updateArticleContent.useMutation({})

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { run: updateArticleTitleByTitleDebounce } = useDebounceFn(
    updateTitleByTitleMutate
  )

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { run: updateArticleContentDebounce } =
    useDebounceFn(updateArticleContent)

  if (!cateId || !articleId) {
    return <>数据错误</>
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getArticleByCateIdAndId({
      id: articleId || '',
      cateId,
    })

    const titleStoreSub = useEditorStore.subscribe(
      (state) => state.title,
      (curSidebars, preSidebars) => {
        if (curSidebars !== preSidebars) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          updateArticleTitleByTitleDebounce({
            title: curSidebars,
            id: articleId,
          })
          updateArticleTitleById(curSidebars, {
            articleId,
            cateId,
          })
        }
      },
      {
        equalityFn: shallow,
      }
    )
    const coverStoreSub = useEditorStore.subscribe(
      (state) => state.cover,
      (curSidebars, preSidebars) => {
        if (curSidebars !== preSidebars) {
          updateArticleCover({
            articleId: articleId,
            coverUrl: curSidebars,
          })
        }
      },
      {
        equalityFn: shallow,
      }
    )
    return () => {
      titleStoreSub()
      coverStoreSub()
    }
  }, [])

  const onContentHandle = (content: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    updateArticleContentDebounce({
      content,
      id: articleId,
    })
  }

  const onSwitchRelease = (isRelease: boolean) => {
    updateArticleCoverRelease({
      articleId: articleId,
      isRelease,
    })
  }

  const onTitleHandle = (articleTitle: string) => {
    changeTitle(articleTitle)
  }

  const onArticleViewHandle = () => {
    route.push(`/blog/post/${articleId}`)
  }

  return isLoading ? (
    <div className="flex flex-col space-y-2">
      <Skeleton className="flex h-64 w-full rounded-lg" />
      <Skeleton className="flex h-20 w-72 rounded-lg" />
      <Skeleton className=" flex h-screen w-full rounded-lg" />
    </div>
  ) : (
    <>
      <Toolbar
        isRelease={currentArticle?.is_release ?? false}
        onSwitchRelease={onSwitchRelease}
      />
      <Editor
        articleId={articleId}
        onTitle={onTitleHandle}
        onContent={onContentHandle}
        onCover={changeEditorCover}
        coverUrl={cover}
        title={title}
        defaultContent={currentArticle?.content ?? ''}
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
