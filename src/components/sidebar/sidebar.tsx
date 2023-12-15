'use client'
import { Category } from '@/db/schema'
import { useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import { MenuType } from '@/types/Common'
import { Sidebar } from '@/types/sidebar'
import { Accordion, AccordionItem, ScrollShadow } from '@nextui-org/react'
import { createId } from '@paralleldrive/cuid2'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { AddArticle } from './add-article-action'
import { DropDownMenu } from './dropdown-menu'
import { PopoverInput } from './popover-input'
import { SidebarItem } from './sidebar-item'
import { MenuTitle } from './sidebar-menu'
import { SidebarTop } from './sidebar-top'

type MenuParam = Pick<Category, 'id' | 'name'>

type DiffResult = {
  add: MenuParam[]
  modi: MenuParam[]
  del: MenuParam[]
}

export function SideBar() {
  const pathName = usePathname()
  const [activeId, setActiveId] = useState<string>('')
  const { data: categoriesFromServer } = ClientTRPC.getAllCategory.useQuery<
    Category[]
  >(void 0, {
    refetchOnWindowFocus: false,
  })

  const {
    initMenus,
    insertMenu,
    deleteMenu,
    editMenu,
    insertArticleToCategory,
    deleteArticleTitleById,
  } = useSidebarStore()
  const sidebars = useSidebarStore.use.sidebars()
  const { mutate: insertCategory } = ClientTRPC.insertCategory.useMutation({
    onSuccess() {
      console.log('onSuccess insertCategory>>>>')
    },
  })

  const { mutate: insertArticle } = ClientTRPC.insertArticle.useMutation()
  const { mutate: updateCategory } = ClientTRPC.updateCategory.useMutation({
    onSuccess() {
      console.log('onSuccess updateCategory>>>>')
    },
  })

  const { mutate: deleteCategoryById } =
    ClientTRPC.deleteCategoryById.useMutation({
      onSuccess() {
        console.log('onSuccess deleteCategoryById>>>>')
      },
    })

  useEffect(() => {
    if (categoriesFromServer) {
      initMenus(categoriesFromServer)
    }
  }, [categoriesFromServer])

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
          updateCategory({
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
        fireImmediately: false,
      }
    )
  }, [])

  const diffChildren = (curChildren: Sidebar[], preChildren: Sidebar[]) => {
    const diff: DiffResult = {
      add: [],
      del: [],
      modi: [],
    }
    const preArray = Array.from(preChildren)
    curChildren.forEach((cur) => {
      const findPre = preArray.find((pre) => {
        return cur.id === pre.id
      })
      const curOnPreIndex = preArray.findIndex((pre) => {
        return cur.id === pre.id
      })
      if (curOnPreIndex !== -1) {
        preArray.splice(curOnPreIndex, 1)
      }
      if (!findPre) {
        console.log('cur children add')
        diff.add.push({
          name: cur.name as string,
          id: cur.id,
        })
      } else {
        if (findPre.name !== cur.name) {
          console.log('cur children update')
          diff.modi.push({
            name: cur.name as string,
            id: cur.id,
          })
        }
      }
    })
    diff.del = preArray as MenuParam[]
    return diff
  }

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

  return (
    <ScrollShadow
      className="sticky left-0 top-0 box-border  
    flex h-full w-72 flex-col space-y-2
     border-r-1 border-default-100 px-4"
    >
      <SidebarTop />
      {sidebars.map((sidebar) => {
        return (
          <>
            <MenuTitle key={sidebar.id} onAdd={onAddHandle} id={sidebar.id}>
              {sidebar.name}
            </MenuTitle>
            {Array.isArray(sidebar.children) &&
              sidebar.children.map((subSidebar) => {
                if (Array.isArray(subSidebar.children)) {
                  return (
                    <Accordion
                      title={subSidebar.name as string}
                      key={subSidebar.id}
                      className="p-0"
                      itemClasses={{
                        base: 'py-0 w-full',
                        title: 'font-normal text-medium',
                        trigger:
                          'py-0 px-3 data-[hover=true]:bg-primary-100 rounded-lg flex items-center h-11',
                        indicator: 'text-medium px-2',
                        content: 'text-small px-2 ',
                      }}
                    >
                      <AccordionItem
                        startContent={subSidebar.icon}
                        key={subSidebar.id}
                        hideIndicator={!subSidebar.children.length}
                        title={
                          <div className="flex items-center justify-between">
                            <PopoverInput
                              onPopoverInputChange={editMenu}
                              onClose={() => setActiveId('')}
                              id={subSidebar.id}
                              name={subSidebar.name as string}
                              activeId={activeId}
                            ></PopoverInput>
                            <div>
                              <DropDownMenu
                                id={subSidebar.id}
                                onAction={onDropdownHandle}
                              ></DropDownMenu>
                              <AddArticle
                                categoryId={subSidebar.id}
                                onAddArticle={onAddArticle}
                              />
                            </div>
                          </div>
                        }
                      >
                        {Array.isArray(subSidebar.children)
                          ? subSidebar.children.map((child) => {
                              return (
                                <SidebarItem
                                  isShowDelBtn={
                                    sidebar.id === MenuType.CATEGORY
                                  }
                                  onSidebarDel={() =>
                                    deleteArticleTitleById(
                                      subSidebar.id,
                                      child.id
                                    )
                                  }
                                  key={child.id}
                                  href={child.href || ''}
                                >
                                  {child.name}
                                </SidebarItem>
                              )
                            })
                          : null}
                      </AccordionItem>
                    </Accordion>
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
          </>
        )
      })}
    </ScrollShadow>
  )
}
