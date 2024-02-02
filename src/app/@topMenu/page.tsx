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
  const backHome = () => {
    route.push('/')
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="cursor-pointer font-bold text-inherit" onClick={backHome}>
          <svg
            className='logo'
            width="40"
            height="40"
            viewBox="0 0 797 767"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M200 418.5C4.75189 469.396 -46.5 355.5 60.5002 194.5C167.5 33.4997 334 -22.5004 450 18.9998C566 60.5 549 254.5 523.501 355.5C498.001 456.5 355 507.5 345.5 507.5C336 507.5 318.5 489 336 461.5C353.5 434 428 305 482.5 335C501 355.5 496.887 355.717 501 366.5C505.747 382.318 505.842 390.552 501 404C535.001 400.772 562 398.328 584.5 418.5C607 438.672 590.081 481.12 546.5 512.5C540.47 514.887 536.5 512.5 532.5 512.5C521.5 502.5 519.5 507.5 517 488C517 465 519 464.5 528 467.5C537 470.5 527.577 653.425 528 652.5C523.501 719 524.056 715.788 512 752C498.732 767.717 496.721 763.244 501 736C521.794 671.994 536.585 638.451 571.5 585C601.564 540.145 618.759 515.478 650.5 473C686.372 423.153 728 378.665 764.5 404C807 433.5 793.697 512.5 753 558C712.303 603.5 693.238 529.389 694.5 520C694.5 488 739.5 479 739.5 512.5C739.5 546 698.428 619.5 686 574.5C681.703 558.94 687.589 544.31 697.907 538"
              stroke="black"
              strokeWidth="40"
            />
          </svg>
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
          <Button isIconOnly variant="light" as={NextLink} href="/feed.xml">
            <MdRssFeed></MdRssFeed>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
