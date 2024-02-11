import { useState } from 'react'

export const useToggle = (defaultValue: boolean) => {
  const [isToggle, setToggle] = useState<boolean>(defaultValue)

  const open = () => {
    setToggle(true)
  }

  const close = () => {
    setToggle(false)
  }
  return { isToggle, open, close }
}
