import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const useDark = () => {
  const { theme, setTheme } = useTheme()
  const [isDark, setDark] = useState<boolean>(false)
  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    setDark(theme === 'dark')
  }, [theme])

  return { isDark, toggle }
}
