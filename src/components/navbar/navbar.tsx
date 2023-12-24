'use client'
import { Category } from '@/db/schema'
import { ClientTRPC } from '@/trpc/client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import Link from 'next/link'
import { useState } from 'react'
import { MdLightMode, MdNightlight, MdRssFeed } from 'react-icons/md'

export function AppNavbar() {
  const { data: categoriesFromServer } = ClientTRPC.getAllCategory.useQuery<
    Category[]
  >(void 0, {
    refetchOnWindowFocus: false,
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [switchLight, setSwitchLight] = useState(false)
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
            <NavbarItem className="hidden w-full lg:flex" key={cate.id}>
              {cate.name}
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          {switchLight ? <MdNightlight /> : <MdLightMode />}
        </NavbarItem>
        <NavbarItem>
          <MdRssFeed></MdRssFeed>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {categoriesFromServer?.map((item, index) => (
          <NavbarMenuItem key={item.id}>
            <Link className="w-full" href="#">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
