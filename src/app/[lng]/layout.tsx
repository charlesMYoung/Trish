import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import '~/styles/globals.css'
import { TRPCReactProvider } from '~/trpc/react'
import { UIProviders } from './providers'
const languages = ['en', 'de']

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
  topMenu,
  params: { lng },
}: {
  children: React.ReactNode
  topMenu: React.ReactNode
  params: {
    lng: string
  }
}) {
  const headersList = headers()
  const fullUrl = headersList.get('referer') ?? ''
  console.log('fullUrl', fullUrl)
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`font-sans ${inter.variable}`}>
        <UIProviders>
          <TRPCReactProvider>
            {!/(login|dashboard)/.test(fullUrl) && fullUrl ? topMenu : null}
            {children}
          </TRPCReactProvider>
        </UIProviders>
      </body>
    </html>
  )
}
