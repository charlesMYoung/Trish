'use client'

import { Category } from '@/server/db/schema'
import { trpc } from '@/utils/trpc-client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import { Button, Link } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { MdLightMode, MdNightlight, MdRssFeed } from 'react-icons/md'

export default function AppNavbar() {
  const { data: categoriesFromServer } = trpc.getAllCategory.useQuery<
    Category[]
  >(void 0, {
    refetchOnWindowFocus: false,
  })
  const pathname = useParams<{ cate_id: string }>()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSwitchLight = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleRss = () => {
    window.open('https://www.baidu.com')
  }
  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden"
      />
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        {categoriesFromServer?.map((cate) => {
          return (
            <NavbarItem
              className="hidden w-full lg:flex"
              key={cate.id}
              isActive={cate.id === pathname.cate_id}
            >
              <Link
                as={NextLink}
                href={`/blog/category/${cate.id}`}
                color={cate.id !== pathname.cate_id ? 'foreground' : undefined}
              >
                {cate.name}
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
      <NavbarMenu>
        {categoriesFromServer?.map((item) => (
          <NavbarMenuItem key={item.id}>
            <Link
              className="w-full"
              as={NextLink}
              key={item.id}
              href={`/blog/${item.id}`}
              color={item.id !== pathname.cate_id ? 'foreground' : undefined}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
