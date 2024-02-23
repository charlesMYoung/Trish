import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from './navigation'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as 'en' | 'zh')) notFound()

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    messages: require(`@trish/i18n/messages/${locale}.json`),
  }
})
