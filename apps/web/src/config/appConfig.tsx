import { FiHome } from 'react-icons/fi'
import { MdBrowserUpdated } from 'react-icons/md'
import { PiReadCvLogoThin } from 'react-icons/pi'
import { RiDashboard2Fill } from 'react-icons/ri'
import { type Sidebar } from '~/types/sidebar'

export const SideBarConfig: Sidebar[] = [
  {
    name: '主菜单',
    id: 'main',
    children: [
      {
        name: '首页',
        id: 'home',
        icon: <FiHome />,
        href: '/dashboard/home',
      },
      {
        name: '仪表盘',
        id: 'dashboard',
        icon: <RiDashboard2Fill />,
        href: '/dashboard',
      },
    ],
  },
  {
    name: 'Blog',
    id: 'category',
  },
  {
    name: '通用',
    id: 'system',
    children: [
      {
        name: '操作日志',
        id: 'operation',
        icon: <PiReadCvLogoThin />,
        href: '/dashboard/operation',
      },
      {
        name: '系统更新',
        id: 'update',
        icon: <MdBrowserUpdated />,
        href: '/dashboard/update',
      },
    ],
  },
]

export const TopMenus = [
  {
    name: 'Blog',
    url: '/blog',
  },
]
