import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { getServerSession } from 'next-auth'
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
  const session = await getServerSession()
  return (
    <NextAuthProvider>
      {session && session.user ? (
        <section className="flex h-screen flex-col">
          <ScrollShadow className="flex flex-1">
            {sidebar}
            <main className="box-border flex-1 px-4">{main}</main>
          </ScrollShadow>
        </section>
      ) : (
        login
      )}
    </NextAuthProvider>
  )
}
