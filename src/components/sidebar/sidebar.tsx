"use client";
import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxSection,
  ListboxItem,
} from "@nextui-org/react";
import { SideBarConfig } from "@/config/appConfig";
export function SideBar() {
  return (
    <div className="flex w-60 h-screen flex-col bg-default-100">
      <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full max-w-[300px] h-screen overflow-y-auto"
        variant="shadow"
        itemClasses={{
          base: "py-0 w-full",
          title: "font-normal text-medium",
          trigger:
            "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
          indicator: "text-medium",
          content: "text-small px-2",
        }}
      >
        {SideBarConfig.map((sidebar) => {
          return (
            <AccordionItem
              itemID={sidebar.name}
              startContent={sidebar.icon}
              key={sidebar.name}
              aria-label={sidebar.name}
              hideIndicator={sidebar.children ? false : true}
              title={sidebar.name}
            >
              {sidebar.children ? (
                <Listbox>
                  {sidebar.children.map((child) => {
                    return (
                      <ListboxItem key={child.name}>{child.name}</ListboxItem>
                    );
                  })}
                </Listbox>
              ) : null}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
