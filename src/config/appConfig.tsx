import { Sidebar } from '@/types/sidebar'
import { FiHome } from 'react-icons/fi'
import { MdBrowserUpdated } from 'react-icons/md'
import { PiReadCvLogoThin } from 'react-icons/pi'
import { RiDashboard2Fill } from 'react-icons/ri'

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
    name: '系统',
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

export const GalleryList = [
  {
    name: 'chat',
    url: '/images/chat.jpg',
  },
  {
    name: 'postbg',
    url: '/images/postbg.jpg',
  },
  {
    name: 'chat2',
    url: '/images/chat.jpg',
  },
  {
    name: 'postbg3',
    url: '/images/postbg.jpg',
  },
  {
    name: 'chat4',
    url: '/images/chat.jpg',
  },
  {
    name: 'postbg5',
    url: '/images/postbg.jpg',
  },
]

export const TopMenus = [
  {
    name: 'Blog',
    url: '/blog',
  },
  {
    name: '联系',
    url: '/contact',
  },
]
