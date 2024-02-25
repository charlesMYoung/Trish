import { type Category } from '@trish/database/schema'
import { type ReactNode } from 'react'

export type Sidebar = {
  id: string
  name: ReactNode | string
  href?: string
  children?: Sidebar[]
  icon?: ReactNode
  isActive?: boolean
}

export type MenuParam = Pick<Category, 'id' | 'name'>
export type DiffResult = {
  add: MenuParam[]
  modi: MenuParam[]
  del: MenuParam[]
}
