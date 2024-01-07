'use client'

import { Category } from '@/server/db/schema'
import { trpc } from '@/utils/trpc-client'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AppNavbar() {
  const { data: categoriesFromServer } = trpc.getAllCategory.useQuery<
    Category[]
  >(void 0, {
    refetchOnWindowFocus: false,
  })
  const pathname = useParams<{ cate_id: string }>()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden"
      />
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
    </Navbar>
  )
}
