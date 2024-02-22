'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '~/navigation'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const otherLocale = locale === 'en' ? 'zh' : 'en'
  const pathname = usePathname()

  return (
    <Link href={pathname} locale={otherLocale} className="text-primary">
      {otherLocale}
    </Link>
  )
}
