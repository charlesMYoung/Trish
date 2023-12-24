'use client'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Switch } from '@nextui-org/react'
import { MdTipsAndUpdates } from 'react-icons/md'

export function Toolbar() {
  return (
    <Navbar position="static">
      <NavbarContent justify="center">
        <NavbarItem className="hidden w-full lg:flex"></NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          <MdTipsAndUpdates />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Switch defaultSelected aria-label="Automatic updates" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
