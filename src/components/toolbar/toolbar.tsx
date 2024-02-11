'use client'
import { useSidebarStore } from '~/zustand'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { MdLightMode, MdNightlight, MdTipsAndUpdates } from 'react-icons/md'
import { TbLayoutSidebarRight } from 'react-icons/tb'

export function Toolbar() {
  const { theme, setTheme } = useTheme()
  const handleSwitchLight = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const showBar = useSidebarStore.use.showBar()
  const isShowBar = useSidebarStore.use.isShowBar()

  const handleShowSidebar = () => {
    showBar(!isShowBar)
  }
  return (
    <Navbar position="static" isBordered>
      <NavbarContent justify="start">
        <NavbarItem className="w-full lg:hidden">
          <Button isIconOnly variant="light" onPress={handleShowSidebar}>
            <TbLayoutSidebarRight />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          <MdTipsAndUpdates />
        </NavbarItem>
        <NavbarItem className="hidden text-default-400 lg:flex">
          <Button isIconOnly onPress={handleSwitchLight} variant="light">
            {theme === 'light' ? <MdNightlight /> : <MdLightMode />}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
