import { ReactNode } from 'react'

export type Sidebar = {
  id: string
  name: ReactNode | string
  href?: string
  children?: Sidebar[]
  icon?: ReactNode
  isActive?: boolean
}
