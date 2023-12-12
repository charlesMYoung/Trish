import { SideBarConfig } from '@/config/appConfig'
import { Category } from '@/db/schema'
import { Sidebar } from '@/types/sidebar'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface SidebarState {
  sidebars: Sidebar[]
  initMenus: (menus: Category[]) => void
  insertArticleToCategory: (articleId: string, categoryId: string) => void
  updateArticleTitleById: (articleId: string, title: string) => void
}
/**
 * Zustand store for sidebar
 */

export const useSidebarStore = create<SidebarState>()(
  devtools(
    persist(
      (set, get) => ({
        sidebars: SideBarConfig,
        initMenus: (categories: Category[]) =>
          set(() => {
            const sidebars = get().sidebars

            return {
              sidebars: sidebars.map((item) => {
                if (item.id === 'category') {
                  item.children = categories.map((category) => {
                    const sidebarExit = item.children?.find(
                      (sidebar) => sidebar.id === category.id
                    )
                    return {
                      id: category.id,
                      name: category.name,
                      path: '',
                      icon: '',
                      children: sidebarExit?.children || [],
                    }
                  })
                }
                return item
              }),
            }
          }),
        insertArticleToCategory: (articleId, categoryId) => {
          const sidebars = get().sidebars
          set(() => {
            return {
              sidebars: sidebars.map((item) => {
                if (item.id === 'category') {
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
              }),
            }
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
      }),
      {
        name: 'sidebar-store',
      }
    )
  )
)
