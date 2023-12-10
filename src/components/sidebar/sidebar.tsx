'use client'
import { useOnChange, useSidebarStore } from '@/hooks'
import { ClientTRPC } from '@/trpc/client'
import {
  Accordion,
  AccordionItem,
  Input,
  ScrollShadow,
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { SidebarTop } from './sidebar-top'

export function SideBar() {
  const pathName = usePathname()
  const { data: categoriesFromServer } = ClientTRPC.getAllCategory.useQuery()
  const { value, onChange } = useOnChange({})

  // const { data: articles, mutate } = ClientTRPC.getArticleByCateId.useMutation()

  const { mutate: upsertCategoryMutate } =
    ClientTRPC.upsertCategory.useMutation({
      onSuccess: () => {
        ClientTRPC.getAllCategory.useQuery().refetch()
      },
    })

  const sidebars = useSidebarStore((state) => state.sidebars)
  const initMenus = useSidebarStore((state) => state.initMenus)
  // const insertMenu = useSidebarStore((state) => state.insertMenu)

  useEffect(() => {
    if (categoriesFromServer) {
      initMenus(categoriesFromServer)
    }
  }, [])

  const onMenus = (cateName: string) => {
    upsertCategoryMutate({
      name: cateName,
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
        return sidebar.path ? (
          <SidebarItem
            isActive={pathName === sidebar.path}
            key={sidebar.name}
            href={sidebar.path}
            icon={sidebar.icon}
          >
            {sidebar.name}
          </SidebarItem>
        ) : sidebar.children && sidebar.children.length > 0 ? (
          <Accordion
            title={sidebar.name}
            key={sidebar.name}
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
              itemID={sidebar.name}
              key={sidebar.name}
              aria-label={sidebar.name}
              hideIndicator={sidebar.children ? false : true}
              title={
                <Input
                  value={value}
                  onChange={onChange}
                  tabIndex={1}
                  placeholder="无标题"
                  classNames={{
                    input: [
                      'bg-transparent',
                      'hover:bg-transparent',
                      'text-md',
                    ],
                    innerWrapper: ['bg-transparent', 'hover:bg-transparent'],
                    inputWrapper: [
                      'h-45',
                      'bg-transparent',
                      'border-none',
                      'hover:bg-transparent',
                      'data-[hover=true]:bg-transparent',
                      'group-data-[focus=true]:bg-transparent',
                    ],
                  }}
                />
              }
            >
              {sidebar.children
                ? sidebar.children.map((child) => {
                    return (
                      <SidebarItem key={child.name} href={child.path || ''}>
                        {child.name}
                      </SidebarItem>
                    )
                  })
                : null}
            </AccordionItem>
          </Accordion>
        ) : (
          <SidebarMenu key={sidebar.name} onMenus={onMenus}>
            {sidebar.name}
          </SidebarMenu>
        )
      })}
    </ScrollShadow>
  )
}
