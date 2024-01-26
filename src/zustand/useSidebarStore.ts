import { SideBarConfig } from '@/config/appConfig'
import { Article, Category } from '@/server/db/schema'
import { MenuType } from '@/types/Common'
import { Sidebar } from '@/types/sidebar'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { StateCreator, create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createSelectors } from './createSelectors'

export interface SidebarState {
  sidebars: Sidebar[]
  isShowBar: boolean
  showBar: (isShow: boolean) => void
  initMenus: (menus: Category[]) => void
  insertMenu: (menu: Pick<Category, 'id' | 'name'>) => void
  insertArticleToCategory: (articleId: string, categoryId: string) => void
  updateArticleTitleById: (
    title: string,
    ids: { articleId: string; cateId: string }
  ) => void
  deleteArticleTitleById: (cateId: string, articleId: string) => void
  deleteMenu: (menuId: string) => void
  editMenu: (name: string, menuId: string) => void
  insertArticleToCategoryFromServe(
    articles: Pick<Article, 'id' | 'title' | 'category_id'>[],
    categoryId: string
  ): void
}

const sidebarState: StateCreator<
  SidebarState,
  [
    ['zustand/immer', never],
    ['zustand/devtools', unknown],
    ['zustand/subscribeWithSelector', unknown],
  ]
> = (set) => ({
  sidebars: SideBarConfig,
  isShowBar: false,
  showBar: (isShow) =>
    set((state) => {
      state.isShowBar = isShow
    }),
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
  editMenu: (name: string, menuId: string) =>
    set((state) => {
      state.sidebars.forEach((item) => {
        if (item.id === MenuType.CATEGORY) {
          item.children?.forEach((subItem) => {
            if (subItem.id === menuId) {
              subItem.name = name
              return
            }
          })
        }
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
  deleteMenu: (menuId: string) =>
    set((state) => {
      state.sidebars = state.sidebars.map((item) => {
        if (item.id === MenuType.CATEGORY) {
          item.children = item.children?.filter(
            (category) => category.id !== menuId
          )
        }
        return item
      })
    }),
  insertArticleToCategory: (articleId, categoryId) => {
    return set((state) => {
      state.sidebars.forEach((item) => {
        if (item.id === MenuType.CATEGORY) {
          item.children?.forEach((category) => {
            if (category.id === categoryId) {
              category.children?.push({
                id: articleId,
                name: 'no title',
                href: `/dashboard/article/${categoryId}/${articleId}`,
                icon: '',
                children: [],
              })
              return
            }
          })
        }
      })
    })
  },

  insertArticleToCategoryFromServe(articles, cateId) {
    return set((state) => {
      state.sidebars.forEach((item) => {
        if (item.id === MenuType.CATEGORY) {
          item.children?.forEach((category) => {
            if (category.id === cateId) {
              category.children = articles?.map((article) => {
                return {
                  id: article.id,
                  name: article.title,
                  href: `/dashboard/article/${article.category_id}/${article.id}`,
                  icon: '',
                  children: [],
                }
              })
              return
            }
          })
        }
      })
    })
  },

  updateArticleTitleById: (title, { articleId, cateId }) => {
    return set((state) => {
      state.sidebars.forEach((item) => {
        if (item.id === 'category') {
          item.children?.forEach((category) => {
            if (category.id === cateId) {
              category.children?.forEach((article) => {
                if (article.id === articleId) {
                  article.name = title
                }
                return
              })
            }
          })
        }
      })
    })
  },

  deleteArticleTitleById: (cateId: string, articleId: string) =>
    set((state) => {
      state.sidebars.forEach((item) => {
        if (item.id === 'category') {
          item.children?.forEach((category) => {
            if (category.id === cateId) {
              category.children = category.children?.filter(
                (article) => article.id !== articleId
              )
            }
          })
        }
      })
    }),
})

/**
 * Zustand store for sidebar
 */
export const useSidebarStore = createSelectors(
  create<SidebarState>()(
    immer(
      devtools(subscribeWithSelector(sidebarState), {
        enabled: process.env.NODE_ENV === 'development',
        name: 'sidebar-store',
      })
    )
  )
)
