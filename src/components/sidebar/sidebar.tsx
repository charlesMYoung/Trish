'use client'
import { Category } from '@/db/schema'
import { useOnChange, useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import { Accordion, AccordionItem, ScrollShadow } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { DropDownMenu } from './dropdown-menu'
import { PopoverInput } from './popover-input'
import { SidebarItem } from './sidebar-item'
import { MenuTitle } from './sidebar-menu'
import { SidebarTop } from './sidebar-top'

export function SideBar() {
  const pathName = usePathname()
  const [activeId, setActiveId] = useState<string>('')
  const trpcUtils = ClientTRPC.useUtils()
  const { data: categoriesFromServer } =
    ClientTRPC.getAllCategory.useQuery<Category[]>()

  const { mutate: insertCategory } = ClientTRPC.insertCategory.useMutation({
    onSuccess() {
      trpcUtils.getAllCategory.refetch()
    },
  })
  const { mutate: updateCategory } = ClientTRPC.updateCategory.useMutation({
    onSuccess() {
      trpcUtils.getAllCategory.refetch()
    },
  })

  const { mutate: deleteCategoryById } =
    ClientTRPC.deleteCategoryById.useMutation({
      onSuccess() {
        trpcUtils.getAllCategory.refetch()
      },
    })

  const { onChange } = useOnChange<{
    event: ChangeEvent<HTMLInputElement>
    id: string
  }>({
    onChangeDebounceFN: ({ event, id }) => {
      const name = event.target.value
      updateCategory({
        name,
        id,
      })
    },
  })

  const sidebars = useSidebarStore((state) => state.sidebars)
  //初始化菜单
  const initMenus = useSidebarStore((state) => state.initMenus)

  useEffect(() => {
    if (categoriesFromServer) {
      initMenus(categoriesFromServer)
    }
  }, [categoriesFromServer])

  const onAddHandle = () => {
    insertCategory({
      name: '未命名',
    })
  }

  const onDropdownHandle = (key: string, id: string) => {
    if (key === 'delete') {
      deleteCategoryById({
        id,
      })
    } else if (key === 'edit') {
      setActiveId(id)
    }
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
                        itemID={subSidebar.id}
                        aria-label={subSidebar.id}
                        hideIndicator={!subSidebar.children.length}
                        title={
                          <div className="flex items-center justify-between">
                            <PopoverInput
                              onChange={(e) => {
                                onChange({ event: e, id: subSidebar.id })
                              }}
                              onClose={() => setActiveId('')}
                              id={subSidebar.id}
                              name={subSidebar.name as string}
                              activeId={activeId}
                            ></PopoverInput>
                            <DropDownMenu
                              id={subSidebar.id}
                              onAction={onDropdownHandle}
                            ></DropDownMenu>
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
