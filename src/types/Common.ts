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
