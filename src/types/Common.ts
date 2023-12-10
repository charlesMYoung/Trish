import React from 'react'

export type SubMenu = {
  path?: string | undefined
  name: string
  host?: boolean | undefined
  parent?: string | undefined
  parentPath?: string | undefined
  icon?: React.ReactNode | undefined
}

export type Menu = {
  name: string
  icon?: React.ReactNode | undefined
  path?: string | undefined
  children?: SubMenu[] | undefined
} & SubMenu

export type Article = {
  id: string
  title: string
  description: string
  is_release: boolean
  content: string
  release_date: Date
  created_at: Date
  modified_at: Date
  category_id: string
}
