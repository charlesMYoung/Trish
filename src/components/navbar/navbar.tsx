'use client'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Input } from '@nextui-org/react'
import { CgSearch } from 'react-icons/cg'
import { MdTipsAndUpdates } from 'react-icons/md'

export function AppNavbar() {
  return (
    <Navbar position="static">
      <NavbarContent justify="center">
        <NavbarItem className="hidden w-full lg:flex">
          <Input endContent={<CgSearch />} size="sm"></Input>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          <MdTipsAndUpdates />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex"></NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
