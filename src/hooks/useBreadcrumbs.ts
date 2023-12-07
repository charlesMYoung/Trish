import { SideBarConfig } from '@/config/appConfig'
import { Menu, SubMenu } from '@/types/Common'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useBreadcrumb = () => {
  const pathName = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<SubMenu[]>([])
  useEffect(() => {
    initBreadcrumbs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName])
  const initBreadcrumbs = () => {
    const flatMenuConfig = getFlatConfig()
    const menuConfig =
      flatMenuConfig.find((item) => item.path === pathName) || ({} as SubMenu)
    if (menuConfig.path) {
      if (menuConfig.parent) {
        setBreadcrumbs([
          {
            name: menuConfig.parent,
            path: menuConfig.parentPath,
            icon: menuConfig.icon,
          },
          {
            name: menuConfig.name,
            path: menuConfig.path,
            icon: menuConfig.icon,
          },
        ])
      } else {
        setBreadcrumbs([
          {
            name: menuConfig.name,
            path: menuConfig.path,
            icon: menuConfig.icon,
          },
        ])
      }
    }
  }

  const getFlatConfig = () => {
    return SideBarConfig.reduce((acc: Menu[], cur: Menu) => {
      if (cur.children) {
        const { path } = cur.children.find((item) => item.host) as SubMenu
        cur.children = cur.children.map((item) => {
          return {
            ...item,
            icon: cur.icon,
            parentPath: path,
            parent: cur.name,
          }
        })
        return [...acc, ...cur.children]
      }
      return [...acc, cur]
    }, []).filter((item) => item.path)
  }

  return { breadcrumbs }
}
