import { ReactNode } from 'react'

export type Sidebar = {
  id: string
  name: string | ReactNode
  href?: string
  children?: Sidebar[]
  icon?: ReactNode
  isActive?: boolean
}
