import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { Toolbar } from '~/components'
import { getServerAuthSession } from '~/server/auth'
import { NextAuthProvider } from './provider/auth-provider'

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
  const session = await getServerAuthSession()
  return (
    <NextAuthProvider>
      {session && session.user ? (
        <section className="flex h-screen flex-col">
          <Toolbar />
          <ScrollShadow className="flex flex-1">
            {sidebar}
            <main className="mt-4 box-border flex-1 p-4">{main}</main>
          </ScrollShadow>
        </section>
      ) : (
        login
      )}
    </NextAuthProvider>
  )
}
