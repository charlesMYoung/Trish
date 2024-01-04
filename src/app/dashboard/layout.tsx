import { Toolbar } from '@/components'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { NextAuthProvider } from './auth-provider'
import ProtectedRoute from './protection'

export default function DashboardLayout({
  children,
  sidebar,
  main,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  main: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      <ProtectedRoute>
        <section className="flex h-screen">
          {sidebar}
          <ScrollShadow className="container">
            <Toolbar />
            <div className="box-border p-4">
              <main className="mt-4">{main}</main>
            </div>
          </ScrollShadow>
        </section>
      </ProtectedRoute>
    </NextAuthProvider>
  )
}
