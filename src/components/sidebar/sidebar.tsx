'use client'
import { Category } from '@/db/schema'
import { useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import { Accordion, AccordionItem, ScrollShadow } from '@nextui-org/react'
import { createId } from '@paralleldrive/cuid2'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AddArticle } from './add-article-action'
import { DropDownMenu } from './dropdown-menu'
import { PopoverInput } from './popover-input'
import { SidebarItem } from './sidebar-item'
import { MenuTitle } from './sidebar-menu'
import { SidebarTop } from './sidebar-top'

export function SideBar() {
  const pathName = usePathname()
  const route = useRouter()
  const [activeId, setActiveId] = useState<string>('')
  const { data: categoriesFromServer } =
    ClientTRPC.getAllCategory.useQuery<Category[]>()

  const {
    initMenus,
    insertMenu,
    deleteMenu,
    editMenu,
    insertArticleToCategory,
  } = useSidebarStore()
  const sidebars = useSidebarStore.use.sidebars()

  // const articleMutation = ClientTRPC.upsetArticle.useMutation()

  // const { mutate: insertCategory } = ClientTRPC.insertCategory.useMutation({
  //   onSuccess() {
  //     trpcUtils.getAllCategory.refetch()
  //   },
  // })
  // const { mutate: updateCategory } = ClientTRPC.updateCategory.useMutation({
  //   onSuccess() {
  //     trpcUtils.getAllCategory.refetch()
  //   },
  // })

  // const { mutate: deleteCategoryById } =
  //   ClientTRPC.deleteCategoryById.useMutation({
  //     onSuccess() {
  //       trpcUtils.getAllCategory.refetch()
  //     },
  //   })

  useEffect(() => {
    if (categoriesFromServer) {
      console.log('sidebars>>>>', sidebars)
      initMenus(categoriesFromServer)
    }
  }, [categoriesFromServer])

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
    route.push(`/dashboard/article/${articleId}`)
    insertArticleToCategory(articleId, categoryId)
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
            <MenuTitle
              key={sidebar.name as string}
              onAdd={onAddHandle}
              id={sidebar.id}
            >
              {sidebar.name}
            </MenuTitle>
            {Array.isArray(sidebar.children) &&
              sidebar.children.map((subSidebar) => {
                if (Array.isArray(subSidebar.children)) {
                  return (
                    <Accordion
                      title={(subSidebar.name + subSidebar.id) as string}
                      key={subSidebar.id}
                      className="p-0"
                      onSelectionChange={(e) => {
                        console.log('e++++++++++++++++', e.toString())
                      }}
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
                        itemID={subSidebar.id}
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
                    {subSidebar.id}
                  </SidebarItem>
                )
              })}
          </>
        )
      })}
    </ScrollShadow>
  )
}
