import { Toolbar } from '@/components'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { getServerSession } from 'next-auth'
import { NextAuthProvider } from './auth-provider'

export default async function DashboardLayout({
  sidebar,
  main,
  login,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  main: React.ReactNode
  login: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <NextAuthProvider>
      {session && session.user ? (
        <section className="flex h-screen">
          {sidebar}
          <ScrollShadow className="container">
            <Toolbar />
            <div className="box-border p-4">
              <main className="mt-4">{main}</main>
            </div>
          </ScrollShadow>
        </section>
      ) : (
        login
      )}
    </NextAuthProvider>
  )
}
