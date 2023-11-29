"use client";
import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { SideBarConfig } from "@/config/appConfig";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
export function SideBar() {
  return (
    <div className="flex w-72 flex-col box-border px-4 space-y-3">
      {SideBarConfig.map((sidebar) => {
        return sidebar.path ? (
          <SidebarItem
            key={sidebar.name}
            href={sidebar.path}
            icon={sidebar.icon}
          >
            {sidebar.name}
          </SidebarItem>
        ) : sidebar.children && sidebar.children.length > 0 ? (
          <Accordion
            title={sidebar.name}
            itemClasses={{
              base: "py-0 w-full",
              title: "font-normal text-medium",
              trigger:
                "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
              indicator: "text-medium",
              content: "text-small px-2 ",
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
                    );
                  })
                : null}
            </AccordionItem>
          </Accordion>
        ) : (
          <SidebarMenu key={sidebar.name}>{sidebar.name}</SidebarMenu>
        );
      })}
    </div>
  );
}
