"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { useBreadcrub } from "@/hooks/useBreadcrub";


export function Breadcrumb() {
  const { breadcrubs } = useBreadcrub();
  return (
    <Breadcrumbs>
      <BreadcrumbItem startContent={<RiDashboard2Fill />}>仪表盘</BreadcrumbItem>
      {
        breadcrubs.map(breadcrub => {
          return <BreadcrumbItem
            key={breadcrub.name}
            startContent={breadcrub.icon}
          >
            {breadcrub.name}
          </BreadcrumbItem>
        })
      }
    </Breadcrumbs>
  );
}
