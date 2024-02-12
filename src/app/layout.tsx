'use client'
import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

import { TRPCReactProvider } from '~/trpc/react'
import { UIProviders } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
  topMenu,
}: {
  children: React.ReactNode
  topMenu: React.ReactNode
}) {
  const pathname = usePathname()
  const isShowTopMenu = pathname.includes('/dashboard')
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <UIProviders>
          <TRPCReactProvider>
            {!isShowTopMenu ? topMenu : ''}
            {children}
          </TRPCReactProvider>
        </UIProviders>
      </body>
    </html>
  )
}
