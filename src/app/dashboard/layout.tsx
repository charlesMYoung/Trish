import { AppNavbar, Breadcrumb, SideBar } from '@/components'
import { ScrollShadow } from '@nextui-org/scroll-shadow'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen">
      <SideBar />
      <ScrollShadow className="container">
        <AppNavbar />
        <div className="box-border p-4">
          <Breadcrumb />
          <main className="mt-4">{children}</main>
        </div>
      </ScrollShadow>
    </section>
  )
}
