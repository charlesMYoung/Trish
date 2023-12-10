import { SideBarConfig } from '@/config/appConfig'
import { create } from 'zustand'

type Sidebar = {
  name: string
  path?: string
  icon?: JSX.Element
  children?: Sidebar[]
  id?: string
}

type MenuServer = {
  id: string
  name?: string | unknown
}

interface SidebarState {
  sidebars: Sidebar[]
  initMenus: (menus: MenuServer[]) => void
  insertMenu: (menu: MenuServer) => void
}
/**
 * Zustand store for sidebar
 */
export const useSidebarStore = create<SidebarState>()((set) => ({
  sidebars: SideBarConfig,
  initMenus: (menus: MenuServer[]) =>
    set((state) => {
      const sidebars = menus.map((menu) => ({
        id: menu.id,
        name: (menu.name as string) || ('' as string),
        path: '',
        icon: '',
        children: [],
      })) as unknown as Sidebar[]
      return {
        sidebars: [...state.sidebars, ...sidebars],
      }
    }),

  insertMenu: (menu: MenuServer) => {
    return set((state) => {
      return {
        sidebars: [
          ...state.sidebars,
          {
            id: menu.id,
            name: (menu.name as string) || ('' as string),
            path: '',
            icon: '',
            children: [],
          } as unknown as Sidebar,
        ],
      }
    })
  },
}))
