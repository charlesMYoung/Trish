import { SideBar, Toolbar } from '@/components'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { NextAuthProvider } from './auth-provider'
import ProtectedRoute from './protection'

export default function DashboardLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  console.log('rest>>>>>>>', authModal)
  return (
    <NextAuthProvider>
      <ProtectedRoute>
        <section className="flex h-screen">
          <SideBar />
          <ScrollShadow className="container">
            <Toolbar />
            <div className="box-border p-4">
              <main className="mt-4">{children}</main>
              1111{authModal}
            </div>
          </ScrollShadow>
        </section>
      </ProtectedRoute>
    </NextAuthProvider>
  )
}
