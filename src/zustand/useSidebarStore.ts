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
      let sidebars = get().sidebars
      const categoryIndex = sidebars.findIndex((side) => side.id === 'category')
      sidebars = sidebars.filter((item) => {
        return !categories.find((cate) => cate.id === item.id)
      })

      categories
        .map((category) => ({
          id: category.id,
          name: category.name,
          path: '',
          icon: '',
          children: [],
        }))
        .forEach((side, index) => {
          const afterSet = categoryIndex + 1
          const startSet = afterSet + index
          //指定
          sidebars.splice(startSet, 0, side)
        })

      return {
        sidebars,
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
