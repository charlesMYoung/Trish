import { SideBarConfig } from '@/config/appConfig'
import { Category } from '@/db/schema'
import { MenuType } from '@/types/Common'
import { Sidebar } from '@/types/sidebar'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { StateCreator, create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createSelectors } from './createSelectors'

export interface SidebarState {
  sidebars: Sidebar[]
  initMenus: (menus: Category[]) => void
  insertMenu: (menu: Pick<Category, 'id' | 'name'>) => void
  insertArticleToCategory: (articleId: string, categoryId: string) => void
  updateArticleTitleById: (articleId: string, title: string) => void
}

const sidebarState: StateCreator<
  SidebarState,
  [
    ['zustand/immer', never],
    ['zustand/devtools', unknown],
    ['zustand/subscribeWithSelector', unknown],
  ]
> = (set, get) => ({
  sidebars: SideBarConfig,
  initMenus: (categories: Category[]) =>
    set((state) => {
      state.sidebars = state.sidebars.map((item) => {
        if (item.id === MenuType.CATEGORY) {
          item.children = categories.map((category) => {
            const sidebarExit = item.children?.find(
              (sidebar) => sidebar.id === category.id
            )
            return {
              id: category.id,
              name: category.name,
              href: '',
              icon: '',
              children: sidebarExit?.children || [],
            }
          })
        }
        return item
      })
    }),
  insertMenu: (menu) =>
    set((state) => {
      state.sidebars = state.sidebars.map((item) => {
        if (item.id === MenuType.CATEGORY) {
          item.children?.push({
            id: menu.id,
            name: menu.name,
            href: '',
            icon: '',
            children: [],
          })
        }
        return item
      })
    }),
  insertArticleToCategory: (articleId, categoryId) => {
    set((state) => {
      state.sidebars = state.sidebars.map((item) => {
        if (item.id === MenuType.CATEGORY) {
          item.children = item.children?.map((category) => {
            if (category.id === categoryId) {
              category.children?.push({
                id: articleId,
                name: 'no title',
                href: '/dashboard/article/' + articleId,
                icon: '',
                children: [],
              })
            }
            return category
          })
        }
        return item
      })
    })
  },
  updateArticleTitleById: (articleId, title) => {
    const sidebars = get().sidebars
    set(() => {
      return {
        sidebars: sidebars.map((item) => {
          if (item.id === 'category') {
            item.children = item.children?.map((category) => {
              category.children?.map((article) => {
                if (article.id === articleId) {
                  article.name = title
                }
                return article
              })
              return category
            })
          }
          return item
        }),
      }
    })
  },
})

/**
 * Zustand store for sidebar
 */
export const useSidebarStore = createSelectors(
  create<SidebarState>()(
    immer(
      devtools(subscribeWithSelector(sidebarState), {
        enabled: true,
        name: 'sidebar-store',
      })
    )
  )
)
