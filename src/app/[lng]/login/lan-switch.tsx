import Link from 'next/link'
import { languages } from '~/app/i18n/settings'

export const LangSwitch = ({ lng }: { lng: string }) => {
  return languages
    .filter((l) => lng !== l)
    .map((l, index) => {
      return (
        <span key={l} className="text-primary-500">
          {index > 0 && ' or '}
          <Link href={`/${l}/login`}>{l}</Link>
        </span>
      )
    })
}
