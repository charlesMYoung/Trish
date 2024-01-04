import { AppNavbar, Footer } from '@/components'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen flex-col">
      <AppNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  )
}
