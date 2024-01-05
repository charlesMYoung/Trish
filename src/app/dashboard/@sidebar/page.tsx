'use client'

import { Collapse } from '@/components/collapse/collapse'
import { AddArticle } from '@/components/sidebar/add-article-action'
import { ArticleTitle } from '@/components/sidebar/article-title'
import { DropDownMenu } from '@/components/sidebar/dropdown-menu'
import { PopoverInput } from '@/components/sidebar/popover-input'
import { SidebarItem } from '@/components/sidebar/sidebar-item'
import { MenuTitle } from '@/components/sidebar/sidebar-menu'
import { SidebarTop } from '@/components/sidebar/sidebar-top'
import { useSidebarStore } from '@/hooks'
import { Category } from '@/server/db/schema'
import { MenuType } from '@/types/Common'
import { diffChildren } from '@/utils/sidebar'
import { trpc } from '@/utils/trpc-client'
import { ScrollShadow } from '@nextui-org/react'
import { createId } from '@paralleldrive/cuid2'
import { useDebounceFn } from 'ahooks'
import { useResponsive } from 'ahooks/lib/useResponsive'
import { motion } from 'framer-motion'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

export default function SideBarPage() {
  const pathName = usePathname()
  const { slugs } = useParams<{ slugs: string[] }>()
  const [cateId, articleId] = slugs || []
  const [activeId, setActiveId] = useState<string>('')
  const [hoverId, setHoverId] = useState<string>('')
  const [showDropdownId, setShowDropdownId] = useState<string>('')
  const { data: categoriesFromServer } = trpc.getAllCategory.useQuery<
    Category[]
  >(void 0, {
    refetchOnWindowFocus: false,
  })

  const {
    initMenus,
    insertMenu,
    deleteMenu,
    editMenu,
    insertArticleToCategoryFromServe,
    insertArticleToCategory,
    deleteArticleTitleById,
  } = useSidebarStore()
  const sidebars = useSidebarStore.use.sidebars()

  const { data: articles, mutate: getArticleByCateId } =
    trpc.getArticleByCateId.useMutation()
  const { mutate: insertCategory } = trpc.insertCategory.useMutation()
  const { mutate: insertArticle } = trpc.insertArticle.useMutation()
  const { mutate: updateCategory } = trpc.updateCategory.useMutation()
  const { mutate: delArticleById } = trpc.delArticleById.useMutation()
  const { mutate: deleteCategoryById } = trpc.deleteCategoryById.useMutation()

  const { run: updateCategoryDebounce } = useDebounceFn(updateCategory)
  const { md } = useResponsive()

  useEffect(() => {
    if (categoriesFromServer) {
      initMenus(categoriesFromServer)
    }
  }, [categoriesFromServer])

  useEffect(() => {
    const [article] = articles || []
    if (article) {
      insertArticleToCategoryFromServe(
        articles || [],
        article.category_id || ''
      )
    }
  }, [articles])

  useEffect(() => {
    return useSidebarStore.subscribe(
      (state) => state.sidebars,
      (curSidebars, preSidebars) => {
        const { children: curChildren = [] } =
          curSidebars.find((cur) => cur.id === MenuType.CATEGORY) || {}
        const { children: preChildren = [] } =
          preSidebars.find((cur) => cur.id === MenuType.CATEGORY) || {}
        const { add, del, modi } = diffChildren(curChildren, preChildren)
        if (add.length > 0 && add.length === 1) {
          const [{ id, name = '' }] = add
          insertCategory({
            name: name || '',
            id,
          })
        }
        if (modi.length > 0) {
          const [{ id, name = '' }] = modi
          updateCategoryDebounce({
            name: name || '',
            id,
          })
        }
        if (del.length > 0) {
          del.forEach((item) => {
            deleteCategoryById({
              id: item.id,
            })
          })
        }
      },
      {
        equalityFn: shallow,
      }
    )
  }, [])

  const onAddHandle = () => {
    insertMenu({
      id: createId(),
      name: '未命名',
    })
  }

  const onDropdownHandle = (key: string, id: string) => {
    if (key === 'delete') {
      deleteMenu(id)
    } else if (key === 'edit') {
      setActiveId(id)
    }
  }

  const onAddArticle = (articleId: string, categoryId: string) => {
    insertArticleToCategory(articleId, categoryId)
    insertArticle({
      id: articleId,
      cateId: categoryId,
    })
  }

  const onCollapseChange = (id: string) => {
    getArticleByCateId({
      id,
    })
  }

  return (
    <motion.div
      className="sticky left-0 top-0 box-border hidden h-full w-72 space-y-2
     border-r-1 border-default-100 pl-4 md:flex md:w-72 lg:w-80"
    >
      <ScrollShadow className="flex-1">
        <SidebarTop />
        {sidebars.map((sidebar) => {
          return (
            <div key={sidebar.id}>
              <MenuTitle onAdd={onAddHandle} id={sidebar.id}>
                {sidebar.name}
              </MenuTitle>
              {Array.isArray(sidebar.children) &&
                sidebar.children.map((subSidebar) => {
                  if (Array.isArray(subSidebar.children)) {
                    return (
                      <Collapse
                        id={subSidebar.id}
                        items={subSidebar.children?.map((child) => {
                          return (
                            <ArticleTitle
                              onSidebarDel={() => {
                                deleteArticleTitleById(subSidebar.id, child.id)
                                delArticleById({
                                  id: child.id,
                                })
                              }}
                              isActive={child.id === articleId}
                              key={child.id}
                              href={child.href || ''}
                            >
                              {child.name || 'no title'}
                            </ArticleTitle>
                          )
                        })}
                        isActived={cateId === subSidebar.id}
                        startContent={subSidebar.icon || ''}
                        key={subSidebar.id}
                        onCollapseChange={onCollapseChange}
                        onHover={setHoverId}
                        title={
                          <div className="flex w-full items-center justify-between">
                            <PopoverInput
                              onPopoverInputChange={editMenu}
                              onClose={() => setActiveId('')}
                              id={subSidebar.id}
                              key={subSidebar.id + 'PopoverInput'}
                              name={subSidebar.name as string}
                              activeId={activeId}
                            ></PopoverInput>

                            {hoverId === subSidebar.id ||
                            showDropdownId === subSidebar.id ? (
                              <div>
                                <DropDownMenu
                                  key={subSidebar.id + 'DropDownMenu'}
                                  onOpenChange={setShowDropdownId}
                                  id={subSidebar.id}
                                  onAction={onDropdownHandle}
                                ></DropDownMenu>
                                <AddArticle
                                  categoryId={subSidebar.id}
                                  onAddArticle={onAddArticle}
                                />
                              </div>
                            ) : null}
                          </div>
                        }
                      ></Collapse>
                    )
                  }
                  return (
                    <SidebarItem
                      isActive={pathName === subSidebar.href}
                      key={subSidebar.id}
                      href={subSidebar.href || ''}
                      icon={subSidebar.icon}
                    >
                      {subSidebar.name}
                    </SidebarItem>
                  )
                })}
            </div>
          )
        })}
      </ScrollShadow>
    </motion.div>
  )
}
