'use client'
import { SideBarConfig } from '@/config/appConfig'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { SidebarTop } from './sidebar-top'
export function SideBar() {
  const pathName = usePathname()
  return (
    <div className="sticky left-0 top-0 box-border flex h-full w-72 flex-col space-y-2 border-r-1 border-default-100 px-4">
      <SidebarTop />
      {SideBarConfig.map((sidebar) => {
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
              title={sidebar.name}
            >
              {sidebar.children
                ? sidebar.children.map((child) => {
                    return (
                      <SidebarItem key={child.name} href={child.path}>
                        {child.name}
                      </SidebarItem>
                    )
                  })
                : null}
            </AccordionItem>
          </Accordion>
        ) : (
          <SidebarMenu key={sidebar.name}>{sidebar.name}</SidebarMenu>
        )
      })}
    </div>
  )
}
