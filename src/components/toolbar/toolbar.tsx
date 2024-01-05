'use client'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { MdLightMode, MdNightlight, MdTipsAndUpdates } from 'react-icons/md'

export function Toolbar() {
  const { theme, setTheme } = useTheme()
  const handleSwitchLight = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <Navbar position="static" isBordered>
      <NavbarContent justify="center">
        <NavbarItem className="hidden w-full lg:flex"></NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          <MdTipsAndUpdates />
        </NavbarItem>
        <NavbarItem className="hidden text-default-400 lg:flex ">
          <Button isIconOnly onPress={handleSwitchLight} variant="light">
            {theme === 'light' ? <MdNightlight /> : <MdLightMode />}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
