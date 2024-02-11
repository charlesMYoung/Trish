'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function SidebarTop() {
  const { data: session } = useSession()
  const { push } = useRouter()
  const logoutHandle = () => {
    signOut()
    push('/')
  }
  return (
    <div
      className={twMerge(
        'z-40 flex h-auto w-full items-center justify-center',
        'my-2 mb-10 h-20'
      )}
    >
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: session?.user?.image!,
            }}
            className="transition-transform"
            description={session?.user?.email}
            name={session?.user?.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="logout" color="danger" onPress={logoutHandle}>
            退出
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
