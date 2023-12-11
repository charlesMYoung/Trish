'use client'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { BiEditAlt } from 'react-icons/bi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'

export type DropDownMenuProps = {
  onAction: (key: string, id: string) => void
  id: string
}

export const DropDownMenu = ({ id, onAction }: DropDownMenuProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="flat" size="sm">
          <HiOutlineDotsHorizontal className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="side dropdown menu"
        onAction={(key) => {
          onAction(key as string, id)
        }}
      >
        <DropdownItem
          key="edit"
          startContent={
            <BiEditAlt className="pointer-events-none flex-shrink-0 text-xl text-default-500"></BiEditAlt>
          }
        >
          重命名
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={
            <IoMdTrash className="pointer-events-none flex-shrink-0 text-xl text-danger" />
          }
        >
          删除
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
