import { NextIntlClientProvider, useMessages } from 'next-intl'
import { headers } from 'next/headers'
import '~/styles/globals.css'
import { TRPCReactProvider } from '~/trpc/react'
import { UIProviders } from './providers'

export default function RootLayout({
  children,
  topMenu,
  params: { locale },
}: {
  children: React.ReactNode
  topMenu: React.ReactNode
  params: {
    locale: string
  }
}) {
  const headersList = headers()
  const fullUrl = headersList.get('referer') ?? ''
  const messages = useMessages()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <UIProviders>
            <TRPCReactProvider>
              {!/(login|dashboard)/.test(fullUrl) && fullUrl ? topMenu : null}
              {children}
            </TRPCReactProvider>
          </UIProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
