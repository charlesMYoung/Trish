'use client'

import { Icon } from '@iconify/react'
import { Switch } from '@nextui-org/react'
import { useDark } from '~/hooks/useDark'

export const DarkSwitch = () => {
  const { isDark, toggle } = useDark()
  console.log('isDark', isDark)
  return (
    <Switch
      onValueChange={toggle}
      size="sm"
      defaultSelected={!isDark}
      startContent={
        <Icon icon="ph:moon-stars-fill" className="text-primary-100" />
      }
      endContent={<Icon icon="ph:sun-dim-fill" />}
    ></Switch>
  )
}
