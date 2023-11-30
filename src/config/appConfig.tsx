import { PiArticleMediumBold } from "react-icons/pi";
import { RiDashboard2Fill } from "react-icons/ri";
import { PiReadCvLogoThin } from "react-icons/pi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { SiAboutdotme } from "react-icons/si";
import { AiOutlineMenu } from "react-icons/ai";
import { FaImages } from "react-icons/fa6";

export const SideBarConfig = [
  {
    name: "主菜单",
  },
  {
    name: "仪表盘",
    icon: <RiDashboard2Fill />,
    path: "/dashboard",
  },
  {
    name: "通用",
  },
  {
    name: "文章",
    icon: <PiArticleMediumBold />,
    children: [
      {
        host: true,
        name: "所有",
        path: "/dashboard/article",
      },
      {
        name: "分类",
        path: "/dashboard/article/category",
      },
      {
        name: "标签",
        path: "/dashboard/article/tags",
      },
    ],
  },
  {
    name: "图片管理",
    icon: <FaImages />,
    path: "/dashboard/images",
  },

  {
    name: "菜单",
    icon: <AiOutlineMenu />,
    path: "/dashboard/menus",
  },
  {
    name: "关于",
    icon: <SiAboutdotme />,
    path: "/dashboard/about",
  },
  {
    name: "系统",
  },
  {
    name: "操作日志",
    icon: <PiReadCvLogoThin />,
    path: "/dashboard/operation",
  },
  {
    name: "系统更新",
    icon: <MdOutlineTipsAndUpdates />,
    path: "/dashboard/update",
  },
];
