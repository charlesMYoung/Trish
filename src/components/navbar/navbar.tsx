'use client'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Avatar } from '@nextui-org/react'

export function AppNavbar() {
  return (
    <Navbar position="static">
      <NavbarContent justify="start">
        <NavbarItem className="hidden lg:flex">start</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Avatar
            showFallback
            name="Jane"
            src="https://images.unsplash.com/broken"
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
