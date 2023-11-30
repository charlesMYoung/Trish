'use client'
import { useBreadcrumb } from '@/hooks/useBreadcrumbs'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { RiDashboard2Fill } from 'react-icons/ri'

export function Breadcrumb() {
  const { breadcrumbs } = useBreadcrumb()
  return (
    <Breadcrumbs>
      <BreadcrumbItem startContent={<RiDashboard2Fill />}>
        仪表盘
      </BreadcrumbItem>
      {breadcrumbs.map((breadcrumb) => {
        return (
          <BreadcrumbItem key={breadcrumb.name} startContent={breadcrumb.icon}>
            {breadcrumb.name}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
}
