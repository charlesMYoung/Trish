import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { PiArticleMediumBold, PiReadCvLogoThin } from 'react-icons/pi'
import { RiDashboard2Fill } from 'react-icons/ri'

export const SideBarConfig = [
  {
    name: '主菜单',
  },
  {
    name: '仪表盘',
    icon: <RiDashboard2Fill />,
    path: '/dashboard',
  },
  {
    name: '文章',
  },
  {
    name: '文章',
    icon: <PiArticleMediumBold />,
    children: [
      {
        host: true,
        name: '列表',
        path: '/dashboard/article',
      },
      {
        name: '分类',
        path: '/dashboard/article/category',
      },
      {
        name: '标签',
        path: '/dashboard/article/tags',
      },
    ],
  },

  {
    name: '系统',
  },
  {
    name: '操作日志',
    icon: <PiReadCvLogoThin />,
    path: '/dashboard/operation',
  },
  {
    name: '系统更新',
    icon: <MdOutlineTipsAndUpdates />,
    path: '/dashboard/update',
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
