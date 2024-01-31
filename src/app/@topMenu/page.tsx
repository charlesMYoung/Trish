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
import { useRouter } from 'next/navigation'
import { MdLightMode, MdNightlight, MdRssFeed } from 'react-icons/md'

export default function TopMenu() {
  const { theme, setTheme } = useTheme()
  const route = useRouter()
  const handleSwitchLight = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleRss = () => {}

  const backHome = () => {
    route.push('/')
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit" onClick={backHome}>
          Aiden.Young
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {TopMenus?.map((menu) => {
          return (
            <NavbarItem key={menu.name}>
              <Link as={NextLink} href={menu.url} color={'foreground'}>
                {menu.name}
              </Link>
            </NavbarItem>
          )
        })}
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          <Button isIconOnly onPress={handleSwitchLight} variant="light">
            {theme === 'light' ? <MdNightlight /> : <MdLightMode />}
          </Button>
        </NavbarItem>
        <NavbarItem className="text-default-400 lg:flex">
          <Button
            isIconOnly
            onPress={handleRss}
            variant="light"
            as={NextLink}
            href="/feed.xml"
          >
            <MdRssFeed></MdRssFeed>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
