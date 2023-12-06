import { AiOutlineMenu } from 'react-icons/ai'
import { FaImages } from 'react-icons/fa6'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { PiArticleMediumBold, PiReadCvLogoThin } from 'react-icons/pi'
import { RiDashboard2Fill } from 'react-icons/ri'
import { SiAboutdotme } from 'react-icons/si'

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
    name: '通用',
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
    name: '图片管理',
    icon: <FaImages />,
    path: '/dashboard/images',
  },

  {
    name: '菜单',
    icon: <AiOutlineMenu />,
    path: '/dashboard/menus',
  },
  {
    name: '关于',
    icon: <SiAboutdotme />,
    path: '/dashboard/about',
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
