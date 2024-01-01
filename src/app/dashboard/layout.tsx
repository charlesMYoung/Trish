import { SideBar, Toolbar } from '@/components'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { NextAuthProvider } from './auth-provider'
import ProtectedRoute from './protection'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      <ProtectedRoute>
        <section className="flex h-screen">
          <SideBar />
          <ScrollShadow className="container">
            <Toolbar />
            <div className="box-border p-4">
              <main className="mt-4">{children}</main>
            </div>
          </ScrollShadow>
        </section>
      </ProtectedRoute>
    </NextAuthProvider>
  )
}
