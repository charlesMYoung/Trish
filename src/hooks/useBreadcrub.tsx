import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import { SideBarConfig } from '@/config/appConfig'
import { Menu, SubMenu } from "@/types/Common";

export const useBreadcrub = () => {
    const pathname = usePathname();
    const [breadcrubs, setBreadcrubs] = useState<SubMenu[]>([]);
    useEffect(() => {
        initBreadcrubs()
    }, [pathname])
    const initBreadcrubs = () => {
        const flatMenuConfig = getFlatConfig()
        const menuConfig = flatMenuConfig.find(item => item.path === pathname) || {} as SubMenu
        if (menuConfig.path) {
            if (menuConfig.parent) {
                setBreadcrubs([
                    {
                        name: menuConfig.parent,
                        path: menuConfig.parentPath,
                        icon: menuConfig.icon
                    },
                    {
                        name: menuConfig.name,
                        path: menuConfig.path,
                        icon: menuConfig.icon
                    }
                ])
            } else {
                setBreadcrubs([
                    {
                        name: menuConfig.name,
                        path: menuConfig.path,
                        icon: menuConfig.icon
                    }
                ])
            }
        }
    }

    const getFlatConfig = () => {
        return SideBarConfig.reduce((acc: Menu[], cur: Menu) => {
            if (cur.children) {
                const { path } = cur.children.find(item => item.host) as SubMenu
                cur.children = cur.children.map(item => {
                    return {
                        ...item,
                        icon: cur.icon,
                        parentPath: path,
                        parent: cur.name
                    }
                })
                return [...acc, ...cur.children]
            }
            return [...acc, cur]
        }, []).filter(item => item.path)
    }

    return { breadcrubs }
}