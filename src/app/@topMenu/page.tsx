'use client'

import { TopMenus } from '@/config'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar'
import { Button, Link } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { MdLightMode, MdNightlight, MdRssFeed } from 'react-icons/md'

export default function TopMenu() {
  const { theme, setTheme } = useTheme()

  const handleSwitchLight = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleRss = () => {
    window.open('https://www.baidu.com')
  }
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {TopMenus?.map((menu) => {
          return (
            <NavbarItem className="hidden w-full lg:flex" key={menu.name}>
              <Link as={NextLink} href={menu.url}>
                {menu.name}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          <Button isIconOnly onPress={handleSwitchLight} variant="light">
            {theme === 'light' ? <MdNightlight /> : <MdLightMode />}
          </Button>
        </NavbarItem>
        <NavbarItem className="text-default-400 lg:flex">
          <Button isIconOnly onPress={handleRss} variant="light">
            <MdRssFeed></MdRssFeed>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
