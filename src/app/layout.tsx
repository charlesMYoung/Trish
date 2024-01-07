'use client'

import TRPCProvider from '@/server/trpc/trpc-provider'
import '@/styles/_globals.css'
import '@/styles/editor.scss'
import { usePathname } from 'next/navigation'
import { UIProviders } from './providers'

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
      <body className="text-smiSans">
        <TRPCProvider>
          <UIProviders>
            {!isShowTopMenu ? topMenu : ''}
            {children}
          </UIProviders>
        </TRPCProvider>
      </body>
    </html>
  )
}
