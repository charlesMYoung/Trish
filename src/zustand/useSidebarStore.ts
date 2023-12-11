import { SideBarConfig } from '@/config/appConfig'
import { Category } from '@/db/schema'
import { Sidebar } from '@/types/sidebar'
import { create } from 'zustand'

export interface SidebarState {
  sidebars: Sidebar[]
  initMenus: (menus: Category[]) => void
  insertMenu: (menu: Category) => void
}
/**
 * Zustand store for sidebar
 */
export const useSidebarStore = create<SidebarState>()((set, get) => ({
  sidebars: SideBarConfig,
  initMenus: (categories: Category[]) =>
    set(() => {
      const sidebars = get().sidebars

      return {
        sidebars: sidebars.map((item) => {
          if (item.id === 'category') {
            item.children = categories.map((category) => ({
              id: category.id,
              name: category.name,
              path: '',
              icon: '',
              children: [],
            }))
          }
          return item
        }),
      }
    }),

  insertMenu: (category: Category) => {
    return set((state) => {
      return {
        sidebars: [
          ...state.sidebars,
          {
            id: category.id,
            name: category.name,
            path: '',
            icon: '',
            children: [],
          },
        ],
      }
    })
  },
}))
