'use client'
import { Category } from '@/db/schema'
import { useOnChange, useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import { Accordion, AccordionItem, ScrollShadow } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { ChangeEvent, useEffect } from 'react'
import { NoStyleInput } from '..'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { SidebarTop } from './sidebar-top'

export function SideBar() {
  const pathName = usePathname()
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

  const { value, onChange } = useOnChange<{
    event: ChangeEvent<HTMLInputElement>
    id: string
  }>({
    onChangeDebounceFN: ({ event, id }) => {
      const name = event.target.value
      console.log('name>>>>', name)
      updateCategory({
        name,
        id,
      })
    },
  })

  const sidebars = useSidebarStore((state) => state.sidebars)
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

  return (
    <ScrollShadow
      className="sticky left-0 top-0 box-border 
    flex h-full w-72 flex-col space-y-2
     border-r-1 border-default-100 px-4"
    >
      <SidebarTop />
      {sidebars.map((sidebar) => {
        return sidebar.href ? (
          <SidebarItem
            isActive={pathName === sidebar.href}
            key={sidebar.id}
            href={sidebar.href}
            icon={sidebar.icon}
          >
            {sidebar.name}
          </SidebarItem>
        ) : Array.isArray(sidebar.children) ? (
          <Accordion
            title={sidebar.name as string}
            key={sidebar.id}
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
              startContent={sidebar.icon}
              itemID={sidebar.id}
              aria-label={sidebar.id}
              hideIndicator={!sidebar.children.length}
              title={
                <NoStyleInput
                  key={sidebar.id}
                  defaultValue={
                    value?.event.target.value || (sidebar.name as string)
                  }
                  onChange={(event) => {
                    onChange({
                      event,
                      id: sidebar.id,
                    })
                  }}
                  value={sidebar.name as string}
                ></NoStyleInput>
              }
            >
              {Array.isArray(sidebar.children)
                ? sidebar.children.map((child) => {
                    return (
                      <SidebarItem key={child.id} href={child.href || ''}>
                        {child.name}
                      </SidebarItem>
                    )
                  })
                : null}
            </AccordionItem>
          </Accordion>
        ) : (
          <SidebarMenu key={sidebar.id} onAdd={onAddHandle} id={sidebar.id}>
            {sidebar.name}
          </SidebarMenu>
        )
      })}
    </ScrollShadow>
  )
}
