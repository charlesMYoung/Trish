'use client'
import { useSidebarStore } from '@/zustand'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button, Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { MdLightMode, MdNightlight } from 'react-icons/md'
import { TbLayoutSidebarRight } from 'react-icons/tb'

export function Toolbar({
  isRelease,
  onSwitchRelease,
}: {
  isRelease: boolean
  onSwitchRelease: (isRelease: boolean) => void
}) {
  const { theme, setTheme } = useTheme()
  const handleSwitchLight = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const showBar = useSidebarStore.use.showBar()
  const isShowBar = useSidebarStore.use.isShowBar()

  const handleShowSidebar = () => {
    showBar(!isShowBar)
  }
  return (
    <Navbar position="sticky" isBordered>
      <NavbarContent justify="start">
        <NavbarItem className="w-full lg:hidden">
          <Button isIconOnly variant="light" onPress={handleShowSidebar}>
            <TbLayoutSidebarRight />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden text-2xl text-default-400 lg:flex">
          <Switch
            size="sm"
            defaultSelected={isRelease}
            onValueChange={onSwitchRelease}
          >
            是否发布
          </Switch>
        </NavbarItem>
        <NavbarItem className="hidden text-default-400 lg:flex">
          <Switch
            onValueChange={handleSwitchLight}
            size="sm"
            defaultSelected={theme !== 'light'}
            color="secondary"
            startContent={<MdNightlight />}
            endContent={<MdLightMode />}
          ></Switch>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
